import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let socket = null;

export const useFameCounter = () => {
  const [fame, setFame] = useState(67); // Default to 67 while loading
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io(API_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      socket.on('connect', () => {
        console.log('Connected to fame server');
      });

      socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
        setError('Unable to connect to server');
      });
    }

    // Fetch initial fame data
    const fetchFameData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/fame`);
        if (!response.ok) throw new Error('Failed to fetch fame data');
        const data = await response.json();
        setFame(data.fame);
        setUserVote(data.userVote);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching fame data:', err);
        setError('Failed to load fame data');
        setIsLoading(false);
      }
    };

    fetchFameData();

    // Listen for fame updates
    const handleFameUpdate = (data) => {
      setFame(data.fame);
    };

    socket.on('fameUpdate', handleFameUpdate);

    // Cleanup
    return () => {
      if (socket) {
        socket.off('fameUpdate', handleFameUpdate);
        // Don't disconnect socket, keep it alive for the session
      }
    };
  }, []);

  const vote = async (voteType) => {
    if (isLoading) return;

    try {
      const response = await fetch(`${API_URL}/api/fame/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote: voteType }),
      });

      if (!response.ok) throw new Error('Failed to vote');

      const data = await response.json();
      setFame(data.fame);
      setUserVote(data.userVote);
      setError(null);
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to submit vote');
    }
  };

  const upvote = () => vote('up');
  const downvote = () => vote('down');

  return {
    fame,
    userVote,
    isLoading,
    error,
    upvote,
    downvote,
  };
};

