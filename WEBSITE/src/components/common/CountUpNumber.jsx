import React, { useState, useEffect, useRef } from 'react';

export const CountUpNumber = ({
  start = 1,
  end = 24,
  duration = 1500,
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.round(start + (end - start) * easedProgress);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, end, duration]);

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUpNumber;

