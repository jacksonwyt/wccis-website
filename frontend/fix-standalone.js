// Script to fix the standalone build by copying the missing bundle5 files
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting fix-standalone script...');

// Define paths
const rootDir = process.cwd();
const nextDir = path.join(rootDir, '.next');
const standaloneDir = path.join(nextDir, 'standalone');
const webpackSourceDir = path.join(rootDir, 'node_modules', 'next', 'dist', 'compiled', 'webpack');
const webpackTargetDir = path.join(standaloneDir, 'node_modules', 'next', 'dist', 'compiled', 'webpack');

// Check if standalone directory exists
if (!fs.existsSync(standaloneDir)) {
  console.error('Standalone directory not found. Make sure you have run "next build" with output: "standalone" in next.config.js');
  process.exit(1);
}

// Create webpack directory in standalone if it doesn't exist
if (!fs.existsSync(webpackTargetDir)) {
  console.log(`Creating directory: ${webpackTargetDir}`);
  fs.mkdirSync(webpackTargetDir, { recursive: true });
}

// Copy bundle5 files
try {
  console.log('Copying bundle5 files...');
  const bundle5Files = fs.readdirSync(webpackSourceDir).filter(file => file.startsWith('bundle5'));
  
  if (bundle5Files.length === 0) {
    console.error('No bundle5 files found in source directory');
    process.exit(1);
  }
  
  bundle5Files.forEach(file => {
    const sourcePath = path.join(webpackSourceDir, file);
    const targetPath = path.join(webpackTargetDir, file);
    console.log(`Copying ${sourcePath} to ${targetPath}`);
    fs.copyFileSync(sourcePath, targetPath);
  });
  
  console.log('Successfully copied bundle5 files');
} catch (error) {
  console.error('Error copying bundle5 files:', error);
  process.exit(1);
}

// Verify the files were copied
try {
  const copiedFiles = fs.readdirSync(webpackTargetDir).filter(file => file.startsWith('bundle5'));
  console.log(`Verified ${copiedFiles.length} bundle5 files were copied successfully`);
  copiedFiles.forEach(file => {
    console.log(`- ${file}`);
  });
} catch (error) {
  console.error('Error verifying copied files:', error);
  process.exit(1);
}

console.log('Fix-standalone script completed successfully'); 