// Custom hook for swipe gestures
import { useState, useEffect } from 'react';

export default function useSwipe(elementRef, threshold = 50, onSwipeLeft = () => {}, onSwipeRight = () => {}) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance required
  const minSwipeDistance = threshold;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const onTouchStart = (e) => {
      setTouchEnd(null); // Reset touchEnd
      setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe) {
        onSwipeLeft();
      }
      
      if (isRightSwipe) {
        onSwipeRight();
      }
    };

    // Add event listeners
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    // Cleanup
    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [elementRef, touchStart, touchEnd, minSwipeDistance, onSwipeLeft, onSwipeRight]);

  return {
    touchStart,
    touchEnd,
  };
}
