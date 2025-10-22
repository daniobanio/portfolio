# Quick Start Guide

## First Time Setup

1. **Install all dependencies:**

   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

2. **Create environment file:**

   Create a `.env` file in the root directory with:

   ```env
   VITE_API_URL=http://localhost:3001
   ```

## Running the App

Open **TWO terminal windows**:

### Terminal 1 - Backend Server

```bash
npm run server:dev
```

You should see: `Server running on port 3001`

### Terminal 2 - Frontend

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser

## Testing the Fame Feature

1. Open the homepage
2. Look for the "Fame" counter in the hero section
3. Click the up ⬆️ or down ⬇️ buttons
4. The number should update immediately
5. Open the site in another browser/tab to see real-time updates
6. The button you clicked will turn yellow to show your vote

## Troubleshooting

**"Cannot connect to server"**

- Make sure the backend is running in Terminal 1
- Check that port 3001 is not in use by another app

**"Fame counter shows '...'"**

- Backend might not be running
- Check the backend terminal for errors
- Verify `.env` file exists with correct URL

**"Votes not saving"**

- Check that `server/data.json` exists
- Check server terminal for permission errors

## Next Steps

- See [README.md](./README.md) for full documentation
- See [FAME_SETUP.md](./FAME_SETUP.md) for deployment guide

---

**Happy coding! 🚀**
