import { useState, useEffect } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { database } from '../firebase';
import soundManager from '../utils/soundManager';

const ANALYTICS_REF = ref(database, 'analytics/totalVotes');
const USER_VOTE_KEY = 'userFameVote';

export const useFameCounter = () => {
  const [fame, setFame] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has voted
    const voted = localStorage.getItem(USER_VOTE_KEY) === 'true';
    setHasVoted(voted);

    // Listen to fame count changes in real-time
    const unsubscribe = onValue(ANALYTICS_REF, (snapshot) => {
      const value = snapshot.val() || 0;
      setFame(value);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const upvote = async () => {
    if (isLoading) return;

    const isUnvoting = hasVoted;
    
    // Play sounds
    if (isUnvoting) {
      soundManager.playClick();
    } else {
      soundManager.playUpvote();
    }

    try {
      // Update analytics count atomically
      await runTransaction(ANALYTICS_REF, (current) => {
        const count = current || 0;
        return isUnvoting ? count - 1 : count + 1;
      });

      // Track event in Google Analytics 4 (only when voting, not unvoting)
      if (!isUnvoting && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'fame_vote', {
          event_category: 'engagement',
          event_label: 'upvote',
          value: 1,
        });
      }

      // Update local state
      setHasVoted(!isUnvoting);
      if (!isUnvoting) {
        localStorage.setItem(USER_VOTE_KEY, 'true');
      } else {
        localStorage.removeItem(USER_VOTE_KEY);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return {
    fame,
    hasVoted,
    isLoading,
    error: null,
    upvote,
  };
};
