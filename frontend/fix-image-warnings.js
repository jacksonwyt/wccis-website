// Script to ensure TypeScript is properly installed during the build process
console.log('Checking TypeScript installation...');

try {
  // Try to require typescript to check if it's installed
  require.resolve('typescript');
  console.log('TypeScript is already installed.');
} catch (e) {
  console.log('TypeScript not found. Will be installed during build process.');
}

try {
  // Try to require @types/node to check if it's installed
  require.resolve('@types/node');
  console.log('@types/node is already installed.');
} catch (e) {
  console.log('@types/node not found. Will be installed during build process.');
}

console.log('TypeScript check complete.');