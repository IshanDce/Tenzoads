import React, { useState, useEffect } from 'react';

export const TypewriterWords = ({
  words = ['Apps', 'Websites', 'AI Products', 'Automation'],
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1600,
  className = '',
  cursorClassName = '',
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = words[wordIndex % words.length];

    let timer;
    if (!isDeleting && currentText === fullWord) {
      // Finished typing word, pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText === '') {
      // Finished deleting word, switch to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      timer = setTimeout(() => {}, 300);
    } else if (isDeleting) {
      // Deleting character by character
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing character by character
      timer = setTimeout(() => {
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent font-black">
        {currentText || '\u00A0'}
      </span>
      <span
        className={`inline-block w-[3px] h-[0.9em] ml-1 bg-cyan-400 rounded-sm animate-pulse align-middle ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
};

export default TypewriterWords;

