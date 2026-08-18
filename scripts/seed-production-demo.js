// scripts/seed-production-demo.js
// Script to trigger production-grade backend database seeding

const { execSync } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, '..', 'handyscompany-backend');

console.log('🚀 Running Production Demo Database Seed Script...');
try {
  execSync('npm run seed:demo', { cwd: backendDir, stdio: 'inherit' });
  console.log('✅ Production demo database seeding completed successfully!');
} catch (error) {
  console.error('❌ Error executing database seed:', error.message);
}
