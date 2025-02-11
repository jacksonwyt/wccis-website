// backend/src/utils/security.ts
import xss from 'xss';

export const cleanseInput = (input: string): string => {
  // First remove potentially dangerous patterns
  const sanitized = input
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '');

  // Then use xss sanitizer
  return xss(sanitized);
};