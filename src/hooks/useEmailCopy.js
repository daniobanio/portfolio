import { useState } from 'react';

const useEmailCopy = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@danieltrinh.ca');
      setShowNotification(true);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = 'hello@danieltrinh.ca';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowNotification(true);
    }
  };

  return {
    showNotification,
    setShowNotification,
    handleEmailCopy
  };
};

export default useEmailCopy;

