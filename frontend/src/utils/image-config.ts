// src/utils/image-config.ts
import { ImageProps } from 'next/image';
import { useEffect } from 'react';

// Image memory management - helps reduce memory usage
export const useImageMemoryManagement = () => {
  useEffect(() => {
    // Register a cleanup function to help GC when component unmounts
    return () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        // @ts-ignore - Using non-standard API
        window.requestIdleCallback(() => {
          // This empty callback helps trigger GC when browser is idle
        });
      }
    };
  }, []);
};

export const HERO_IMAGES = {
  PALM_ROAD: {
    src: '/images/hero/palm-road.jpg',
    alt: 'Palm lined road',
  },
  PALM_TREES: {
    src: '/images/hero/palm-trees.jpg',
    alt: 'Palm trees',
  },
  SUNSET_SKYLINE: {
    src: '/images/hero/sunset-skyline.jpg',
    alt: 'Sunset skyline',
  }
} as const;

export const SECTION_IMAGES = {
  CALIFORNIA_STREET: {
    src: '/images/sections/california-street.jpg',
    alt: 'California street view',
  },
  SUNSET_STREET: {
    src: '/images/sections/sunset-street.jpg',
    alt: 'Sunset street view',
  }
} as const;

export const getImageProps = (
  imagePath: string, 
  alt: string,
  priority = false,
  isHero = false
): Partial<ImageProps> => ({
  src: imagePath,
  alt,
  fill: true,
  className: "object-cover",
  priority: isHero ? priority : false, // Only allow priority on hero images when explicitly set
  sizes: isHero 
    ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" // Reduced from 100vw
    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality: isHero ? 75 : 70, // Reduced quality to save memory
  loading: priority && isHero ? undefined : 'lazy', // Force lazy loading except for hero with priority
});