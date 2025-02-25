// src/utils/image-config.ts
import { ImageProps } from 'next/image';

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
  priority,
  sizes: isHero 
    ? "(max-width: 768px) 100vw, 100vw" 
    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality: isHero ? 85 : 80,
  loading: priority ? undefined : 'lazy',
});