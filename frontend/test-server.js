// Simple test script to verify the server configuration
console.log('Testing server configuration...');

// Check Node.js version
console.log(`Node.js version: ${process.version}`);

// Check environment variables
console.log('Environment variables:');
console.log(`  - NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`  - NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL || 'not set'}`);
console.log(`  - NEXT_PUBLIC_SITE_URL: ${process.env.NEXT_PUBLIC_SITE_URL || 'not set'}`);
console.log(`  - PORT: ${process.env.PORT || 'not set'}`);

// Check file system access
const fs = require('fs');
const path = require('path');

try {
  // Check if we can access the current directory
  const files = fs.readdirSync(__dirname);
  console.log(`Successfully read directory. Found ${files.length} files/directories.`);
  
  // Check if we can access the public directory
  const publicPath = path.join(__dirname, 'public');
  if (fs.existsSync(publicPath)) {
    const publicFiles = fs.readdirSync(publicPath);
    console.log(`Successfully read public directory. Found ${publicFiles.length} files/directories.`);
  } else {
    console.log('Public directory not found.');
  }
  
  // Check if we can access the .next directory
  const nextPath = path.join(__dirname, '.next');
  if (fs.existsSync(nextPath)) {
    const nextFiles = fs.readdirSync(nextPath);
    console.log(`Successfully read .next directory. Found ${nextFiles.length} files/directories.`);
    
    // Check if we can access the .next/static directory
    const staticPath = path.join(nextPath, 'static');
    if (fs.existsSync(staticPath)) {
      const staticFiles = fs.readdirSync(staticPath);
      console.log(`Successfully read .next/static directory. Found ${staticFiles.length} files/directories.`);
    } else {
      console.log('.next/static directory not found.');
    }
  } else {
    console.log('.next directory not found.');
  }
} catch (err) {
  console.error('Error accessing file system:', err);
}

// Check if we can load required modules
try {
  require('next');
  console.log('Successfully loaded next module.');
} catch (err) {
  console.error('Error loading next module:', err);
}

try {
  require('react');
  console.log('Successfully loaded react module.');
} catch (err) {
  console.error('Error loading react module:', err);
}

try {
  require('react-dom');
  console.log('Successfully loaded react-dom module.');
} catch (err) {
  console.error('Error loading react-dom module:', err);
}

console.log('Test completed.'); 