import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] // Update with your production domain
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Path to data file
const dataPath = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
function initializeData() {
  if (!fs.existsSync(dataPath)) {
    const initialData = {
      fame: 0,
      votes: {} // Store IP addresses with their vote timestamps
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
  }
}

// Read data from file
function readData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { fame: 0, votes: {} };
  }
}

// Write data to file
function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

// Clean up old votes (older than 24 hours)
function cleanupOldVotes() {
  const data = readData();
  const now = Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  
  Object.keys(data.votes).forEach(ip => {
    if (now - data.votes[ip].timestamp > oneDayInMs) {
      delete data.votes[ip];
    }
  });
  
  writeData(data);
}

// Initialize
initializeData();
// Clean up old votes every hour
setInterval(cleanupOldVotes, 60 * 60 * 1000);

// API Routes
app.get('/api/fame', (req, res) => {
  const data = readData();
  const clientId = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const userVote = data.votes[clientId];
  
  res.json({
    fame: data.fame,
    userVote: userVote ? userVote.vote : null
  });
});

app.post('/api/fame/vote', (req, res) => {
  const { vote } = req.body; // 'up' or 'down'
  const clientId = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  if (vote !== 'up' && vote !== 'down') {
    return res.status(400).json({ error: 'Invalid vote type' });
  }
  
  const data = readData();
  const existingVote = data.votes[clientId];
  
  // Check if user has already voted
  if (existingVote) {
    // If trying to vote the same way, return current state
    if (existingVote.vote === vote) {
      return res.json({
        fame: data.fame,
        userVote: existingVote.vote,
        message: 'Already voted'
      });
    }
    
    // User is changing their vote
    // Reverse the old vote first
    if (existingVote.vote === 'up') {
      data.fame -= 1;
    } else {
      data.fame += 1;
    }
  }
  
  // Apply new vote
  if (vote === 'up') {
    data.fame += 1;
  } else {
    data.fame -= 1;
  }
  
  // Store the vote
  data.votes[clientId] = {
    vote: vote,
    timestamp: Date.now()
  };
  
  writeData(data);
  
  // Broadcast to all connected clients
  io.emit('fameUpdate', {
    fame: data.fame
  });
  
  res.json({
    fame: data.fame,
    userVote: vote
  });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send current fame count to new client
  const data = readData();
  socket.emit('fameUpdate', {
    fame: data.fame
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

