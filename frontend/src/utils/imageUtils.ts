/**
 * Convert file to base64 string
 * @param file - File object from input
 * @returns Promise<string> - Base64 string with data URL prefix
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Convert base64 to displayable image URL
 * @param base64 - Base64 string (with or without data URL prefix)
 * @returns string - Data URL that can be used in img src
 */
export const base64ToImageUrl = (base64: string): string => {
  // If already has data URL prefix, return as is
  if (base64.startsWith('data:')) {
    return base64;
  }
  
  // If just base64 string, add generic image data URL prefix
  return `data:image/jpeg;base64,${base64}`;
};

/**
 * Extract base64 data from data URL
 * @param dataUrl - Data URL string (data:image/jpeg;base64,...)
 * @returns string - Pure base64 string without prefix
 */
export const extractBase64FromDataUrl = (dataUrl: string): string => {
  if (dataUrl.startsWith('data:')) {
    return dataUrl.split(',')[1];
  }
  return dataUrl;
};

/**
 * Validate if file is a valid image
 * @param file - File object
 * @returns boolean - True if valid image
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Check image file size
 * @param file - File object
 * @param maxSizeMB - Maximum size in MB (default 5MB)
 * @returns boolean - True if within size limit
 */
export const isValidImageSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
};

/**
 * Resize image if needed and convert to base64
 * @param file - File object
 * @param maxWidth - Maximum width (default 800px)
 * @param maxHeight - Maximum height (default 600px)
 * @param quality - JPEG quality (0.1 to 1.0, default 0.8)
 * @returns Promise<string> - Resized image as base64
 */
export const resizeImageToBase64 = (
  file: File, 
  maxWidth: number = 800, 
  maxHeight: number = 600, 
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      // Set canvas size
      canvas.width = width;
      canvas.height = height;
      
      // Draw resized image
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to base64
      const base64 = canvas.toDataURL('image/jpeg', quality);
      resolve(base64);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    // Create object URL for the image
    img.src = URL.createObjectURL(file);
  });
}; 