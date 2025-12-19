
import React, { useMemo } from 'react';

const StarField: React.FC = () => {
  // Generate a small number of stars with randomized properties
  const stars = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 25}s`, // Slow speed
      delay: `${Math.random() * 20}s`,
      height: `${60 + Math.random() * 100}px`,
      opacity: 0.1 + Math.random() * 0.2
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            animationDuration: star.duration,
            animationDelay: star.delay,
            height: star.height,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
