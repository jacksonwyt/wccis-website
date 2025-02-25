#!/usr/bin/env node
/**
 * This script fixes Next.js Image component warnings by updating legacy props
 * to their newer equivalents in accordance with Next.js 13+ requirements.
 * 
 * Usage: 
 * node scripts/fix-image-warnings.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Props that need to be migrated and their replacements
const LEGACY_PROPS = {
  'layout': {
    'intrinsic': { width: true, height: true },
    'responsive': { width: true, height: true, style: "{ width: '100%', height: 'auto' }" },
    'fill': { fill: true },
    'fixed': { width: true, height: true },
  },
  'objectFit': {
    any: { style: (value) => `{ objectFit: '${value}' }` },
  },
  'objectPosition': {
    any: { style: (value) => `{ objectPosition: '${value}' }` },
  },
  'lazyBoundary': {
    any: { lazyRoot: (value) => value },
  },
  'lazyRoot': {
    any: { lazyRoot: (value) => value },
  }
};

// File extensions to process
const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * Checks if a component is a Next.js Image component
 * @param {string} line - Line of code to check
 * @returns {boolean} - True if the line contains a Next.js Image component
 */
function isNextImage(line) {
  return (
    (line.includes('import Image from "next/image"') || 
     line.includes('import Image from \'next/image\'') ||
     line.includes("import { Image } from 'next/image'") ||
     line.includes('import { Image } from "next/image"')) ||
    line.includes('<Image')
  );
}

/**
 * Finds all files that potentially contain Next.js Image components
 * @returns {Promise<string[]>} - Array of file paths
 */
async function findImageFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  const pagesDir = path.join(srcDir, 'pages');
  const componentsDir = path.join(srcDir, 'components');

  const patterns = FILE_EXTENSIONS.map(ext => `**/*${ext}`);
  
  const filesFromPages = await glob(patterns, { cwd: pagesDir, absolute: true });
  const filesFromComponents = await glob(patterns, { cwd: componentsDir, absolute: true });
  
  return [...filesFromPages, ...filesFromComponents];
}

/**
 * Extracts props from an Image component JSX
 * @param {string} line - Line containing the Image component
 * @returns {Object} - Object with extracted prop names and values
 */
function extractProps(line) {
  const props = {};
  
  // Find all props using regex
  const propRegex = /(\w+)=(?:{([^}]+)}|"([^"]+)"|'([^']+)')/g;
  let match;
  
  while ((match = propRegex.exec(line)) !== null) {
    const [_, propName, jsValue, doubleQuoteValue, singleQuoteValue] = match;
    const value = jsValue || doubleQuoteValue || singleQuoteValue;
    props[propName] = value;
  }
  
  return props;
}

/**
 * Updates Image component props to use the modern API
 * @param {string} line - Line containing Image component
 * @returns {string} - Updated line
 */
function updateImageProps(line) {
  if (!line.includes('<Image')) {
    return line;
  }
  
  // Extract all current props
  const currentProps = extractProps(line);
  let updatedLine = line;
  let styleProps = {};
  
  // Check each legacy prop
  for (const [legacyProp, replacements] of Object.entries(LEGACY_PROPS)) {
    if (currentProps[legacyProp]) {
      // Remove the legacy prop
      updatedLine = updatedLine.replace(
        new RegExp(`${legacyProp}=(?:{[^}]+}|"[^"]+"|'[^']+')`), 
        ''
      );
      
      const propValue = currentProps[legacyProp];
      
      // Add replacement props
      if (replacements[propValue]) {
        // Handle specific value replacements (like layout="fill")
        const newProps = replacements[propValue];
        
        for (const [newProp, shouldAdd] of Object.entries(newProps)) {
          if (shouldAdd === true && !updatedLine.includes(`${newProp}=`)) {
            if (newProp === 'fill') {
              updatedLine = updatedLine.replace('<Image', `<Image ${newProp} `);
            }
          }
        }
      } else if (replacements.any) {
        // Handle generic replacements (like objectFit="cover")
        const newProps = replacements.any;
        
        for (const [newProp, valueTransformer] of Object.entries(newProps)) {
          if (typeof valueTransformer === 'function') {
            const newValue = valueTransformer(propValue);
            
            if (newProp === 'style') {
              // Handle style props specially to merge them
              const styleValue = newValue.match(/{(.*)}/)[1];
              const styleParts = styleValue.split(',').map(part => part.trim());
              
              for (const part of styleParts) {
                const [key, val] = part.split(':').map(p => p.trim());
                styleProps[key] = val;
              }
            } else if (!updatedLine.includes(`${newProp}=`)) {
              updatedLine = updatedLine.replace('<Image', `<Image ${newProp}=${newValue} `);
            }
          }
        }
      }
    }
  }
  
  // Add merged style prop if needed
  if (Object.keys(styleProps).length > 0) {
    const existingStyleMatch = updatedLine.match(/style=(?:{[^}]+}|"([^"]+)"|'([^']+)')/);
    
    if (existingStyleMatch) {
      // Merge with existing style prop
      const existingStyle = existingStyleMatch[1] || existingStyleMatch[2] || existingStyleMatch[3];
      const existingStyleObj = existingStyle.includes(':') 
        ? existingStyle.split(',').reduce((obj, part) => {
            const [key, val] = part.split(':').map(p => p.trim());
            obj[key] = val;
            return obj;
          }, {})
        : {};
      
      const mergedStyle = { ...existingStyleObj, ...styleProps };
      const mergedStyleStr = Object.entries(mergedStyle)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      
      updatedLine = updatedLine.replace(
        /style=(?:{[^}]+}|"[^"]+"|'[^']+')/,
        `style={{ ${mergedStyleStr} }}`
      );
    } else {
      // Add new style prop
      const styleStr = Object.entries(styleProps)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      
      updatedLine = updatedLine.replace('<Image', `<Image style={{ ${styleStr} }} `);
    }
  }
  
  // Clean up any double spaces
  updatedLine = updatedLine.replace(/\s{2,}/g, ' ');
  
  return updatedLine;
}

/**
 * Processes a file to update Image components
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} - True if file was updated
 */
async function processFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  const lines = content.split('\n');
  let hasNextImage = false;
  let fileWasUpdated = false;
  
  // Check if file imports Next.js Image
  for (const line of lines) {
    if (isNextImage(line)) {
      hasNextImage = true;
      break;
    }
  }
  
  if (!hasNextImage) {
    return false;
  }
  
  // Update Image components
  const updatedLines = lines.map(line => {
    if (line.includes('<Image')) {
      const updatedLine = updateImageProps(line);
      if (updatedLine !== line) {
        fileWasUpdated = true;
        return updatedLine;
      }
    }
    return line;
  });
  
  if (fileWasUpdated) {
    await writeFile(filePath, updatedLines.join('\n'), 'utf8');
    console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
  }
  
  return fileWasUpdated;
}

/**
 * Main function to run the script
 */
async function main() {
  try {
    console.log('🔍 Searching for files with Next.js Image components...');
    const files = await findImageFiles();
    console.log(`Found ${files.length} potential files to check.`);
    
    let updatedCount = 0;
    
    for (const file of files) {
      const wasUpdated = await processFile(file);
      if (wasUpdated) {
        updatedCount++;
      }
    }
    
    console.log('\n========================================');
    console.log(`🎉 Done! Updated ${updatedCount} files.`);
    console.log('========================================\n');
    
    if (updatedCount > 0) {
      console.log('Next steps:');
      console.log('1. Review the changes');
      console.log('2. Run your application to verify everything works');
      console.log('3. Commit the changes');
    } else {
      console.log('No files needed updating. All Image components are using the modern API!');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 