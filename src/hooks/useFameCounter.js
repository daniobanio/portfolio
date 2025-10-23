import { useState, useEffect } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { database } from '../firebase';
import soundManager from '../utils/soundManager';

const FAME_REF = ref(database, 'fame');
const USER_VOTE_KEY = 'userFameVote';

export const useFameCounter = () => {
  const [fame, setFame] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user's vote from localStorage
    const savedVote = localStorage.getItem(USER_VOTE_KEY);
    if (savedVote) setUserVote(savedVote);

    // Listen to fame count changes in real-time
    const unsubscribe = onValue(FAME_REF, (snapshot) => {
      const value = snapshot.val() || 0;
      setFame(value);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const vote = async (voteType) => {
    if (isLoading) return;

    const isUnvoting = userVote === voteType;
    
    // Play sounds
    if (isUnvoting) {
      soundManager.playClick();
    } else {
      voteType === 'up' ? soundManager.playUpvote() : soundManager.playDownvote();
    }

    // Update Firebase atomically
    await runTransaction(FAME_REF, (currentFame) => {
      const current = currentFame || 0;
      
      if (isUnvoting) {
        // Remove vote
        const newFame = userVote === 'up' ? current - 1 : current + 1;
        return newFame;
      } else {
        // Change or add vote
        let newFame = current;
        if (userVote === 'up') newFame -= 1;
        if (userVote === 'down') newFame += 1;
        newFame += voteType === 'up' ? 1 : -1;
        return newFame;
      }
    });

    // Update local state
    const newVote = isUnvoting ? null : voteType;
    setUserVote(newVote);
    if (newVote) {
      localStorage.setItem(USER_VOTE_KEY, newVote);
    } else {
      localStorage.removeItem(USER_VOTE_KEY);
    }
  };

  const upvote = () => vote('up');
  const downvote = () => vote('down');

  return {
    fame,
    userVote,
    isLoading,
    error: null,
    upvote,
    downvote,
  };
};
