import { useState, useEffect } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Khi modal được mở, ngăn chặn cuộn trang
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Ensure modal container has proper styling
      const bodyStyle = document.body.style;
      // Save original styles
      const originalStyles = {
        overflow: bodyStyle.overflow,
        paddingRight: bodyStyle.paddingRight
      };
      
      // Add padding to prevent layout shift when scrollbar disappears
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        bodyStyle.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        // Restore original styles
        bodyStyle.overflow = originalStyles.overflow;
        bodyStyle.paddingRight = originalStyles.paddingRight;
      };
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  
  return { isOpen, open, close };
} 