#!/usr/bin/env node

// Enhanced development server dengan auto-refresh
import { spawn } from 'child_process';
import { watch } from 'fs';
import { join } from 'path';

console.log('🚀 Starting enhanced development server...');

let viteProcess = null;

function startVite() {
  if (viteProcess) {
    viteProcess.kill();
  }
  
  console.log('🔄 Starting Vite server...');
  viteProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
  });
}

function restartVite() {
  console.log('🔁 Restarting Vite server...');
  if (viteProcess) {
    viteProcess.kill();
    setTimeout(startVite, 1000);
  }
}

// Watch for vite.config.ts changes
const configWatcher = watch(join(process.cwd(), 'vite.config.ts'), (eventType) => {
  if (eventType === 'change') {
    console.log('📝 vite.config.ts changed, restarting...');
    restartVite();
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  if (viteProcess) {
    viteProcess.kill();
  }
  configWatcher.close();
  process.exit(0);
});

// Start initial server
startVite();