import { StaticImageData } from 'next/image';

/**
 * Configuration for optimized image loading
 */
export interface OptimizedImageConfig {
  src: string | StaticImageData;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Creates a config object for optimized images
 * This helps standardize image loading across the app and reduce memory usage
 */
export const createOptimizedImageConfig = ({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 80, // Lower quality to save memory
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageConfig) => {
  return {
    src,
    alt,
    sizes,
    priority,
    quality,
    loading,
    placeholder,
    blurDataURL,
  };
};

/**
 * Creates a low-resolution placeholder for an image
 * This is useful for creating blur placeholders without increasing bundle size
 */
export const createBlurPlaceholder = (
  width: number = 10,
  height: number = 10,
  color: string = 'lightgray'
): string => {
  // Create a small SVG as a blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  
  // Convert to base64
  const svgAsBase64 = typeof window === 'undefined'
    ? Buffer.from(svg).toString('base64')
    : btoa(svg);
    
  return `data:image/svg+xml;base64,${svgAsBase64}`;
};

/**
 * Memory efficient image loading strategy
 * - Uses appropriate sizes
 * - Implements proper loading strategies
 * - Creates minimal placeholders
 */
export const memoryEfficientImageProps = {
  // Hero images (load with priority)
  hero: (src: string, alt: string) => createOptimizedImageConfig({
    src,
    alt,
    sizes: '100vw',
    priority: true,
    quality: 85,
    loading: 'eager',
  }),
  
  // Content images (lazy load)
  content: (src: string, alt: string) => createOptimizedImageConfig({
    src,
    alt,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 80,
    loading: 'lazy',
    placeholder: 'blur',
    blurDataURL: createBlurPlaceholder(),
  }),
  
  // Thumbnails (very low quality is fine)
  thumbnail: (src: string, alt: string) => createOptimizedImageConfig({
    src,
    alt,
    sizes: '(max-width: 768px) 30vw, 20vw',
    quality: 60,
    loading: 'lazy',
    placeholder: 'blur',
    blurDataURL: createBlurPlaceholder(),
  }),
}; 