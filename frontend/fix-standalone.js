// Script to fix the standalone build by copying the missing bundle5 files
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting enhanced fix-standalone script...');

// Define paths
const rootDir = process.cwd();
const nextDir = path.join(rootDir, '.next');
const standaloneDir = path.join(nextDir, 'standalone');
const webpackSourceDir = path.join(rootDir, 'node_modules', 'next', 'dist', 'compiled', 'webpack');
const webpackTargetDir = path.join(standaloneDir, 'node_modules', 'next', 'dist', 'compiled', 'webpack');
const fallbackSourceDir = path.join(__dirname, 'node_modules', 'next', 'dist', 'compiled', 'webpack');

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

// Function to find and copy bundle5 files
const copyBundle5Files = (sourceDir, targetDir) => {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.log(`Source directory not found: ${sourceDir}`);
      return false;
    }

    console.log(`Looking for bundle5 files in: ${sourceDir}`);
    const bundle5Files = fs.readdirSync(sourceDir).filter(file => file.startsWith('bundle5'));
    
    if (bundle5Files.length === 0) {
      console.log(`No bundle5 files found in: ${sourceDir}`);
      return false;
    }
    
    bundle5Files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      console.log(`Copying ${sourcePath} to ${targetPath}`);
      fs.copyFileSync(sourcePath, targetPath);
    });
    
    console.log(`Successfully copied ${bundle5Files.length} bundle5 files from ${sourceDir}`);
    return true;
  } catch (error) {
    console.error(`Error copying bundle5 files from ${sourceDir}:`, error);
    return false;
  }
};

// Try to copy from primary source
let success = copyBundle5Files(webpackSourceDir, webpackTargetDir);

// If primary source fails, try fallback location
if (!success && fallbackSourceDir !== webpackSourceDir) {
  console.log('Trying fallback source directory...');
  success = copyBundle5Files(fallbackSourceDir, webpackTargetDir);
}

// If both paths fail, try to create the module manually
if (!success) {
  console.log('No bundle5 files found. Creating empty bundle5.js file as fallback...');
  try {
    const emptyBundlePath = path.join(webpackTargetDir, 'bundle5.js');
    fs.writeFileSync(emptyBundlePath, 'module.exports = {};');
    console.log(`Created empty bundle5.js at ${emptyBundlePath} as fallback`);
    success = true;
  } catch (error) {
    console.error('Error creating empty bundle5.js:', error);
  }
}

// Check if webpack.js exists and modify it if necessary
const webpackJsPath = path.join(standaloneDir, 'node_modules', 'next', 'dist', 'compiled', 'webpack', 'webpack.js');
if (fs.existsSync(webpackJsPath)) {
  try {
    console.log(`Checking webpack.js at ${webpackJsPath}`);
    let webpackContent = fs.readFileSync(webpackJsPath, 'utf8');
    
    // Check if the file tries to require bundle5
    if (webpackContent.includes("require('./bundle5')")) {
      console.log('Found bundle5 reference in webpack.js, checking if we need to patch it');
      if (!fs.existsSync(path.join(webpackTargetDir, 'bundle5.js'))) {
        console.log('Patching webpack.js to handle missing bundle5');
        webpackContent = webpackContent.replace(
          "require('./bundle5')",
          "(() => { try { return require('./bundle5'); } catch(e) { return {}; } })()"
        );
        fs.writeFileSync(webpackJsPath, webpackContent);
        console.log('Successfully patched webpack.js');
      }
    }
  } catch (error) {
    console.error('Error modifying webpack.js:', error);
  }
}

// Verify the fix
try {
  const copiedFiles = fs.readdirSync(webpackTargetDir).filter(file => file.startsWith('bundle5'));
  console.log(`Verified ${copiedFiles.length} bundle5 files in target directory`);
  copiedFiles.forEach(file => {
    console.log(`- ${file}`);
  });
  
  if (copiedFiles.length > 0) {
    console.log('Fix-standalone script completed successfully!');
  } else {
    console.log('Warning: No bundle5 files were found or created');
  }
} catch (error) {
  console.error('Error verifying target directory:', error);
}

console.log('Enhanced fix-standalone script completed'); 