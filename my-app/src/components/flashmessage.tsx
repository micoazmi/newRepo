import { useState, useEffect } from "react";

interface FlashMessageProps {
  message: string;
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close the flash message after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-red-500 text-white rounded">
      {message}
    </div>
  );
};

export default FlashMessage;
