// Test script untuk verifikasi dropdown spam-click fix
// Paste di browser console untuk test

console.log('🧪 Testing Dropdown Spam-Click Fix...');

// Counter untuk track console warnings
let warningCount = 0;
const originalConsoleWarn = console.warn;

// Override console.warn untuk count accessibility warnings
console.warn = function(...args) {
  const message = args.join(' ');
  if (message.includes('Accessibility: Removing aria-hidden')) {
    warningCount++;
    console.log(`⚠️ Warning #${warningCount}: ${message}`);
  } else {
    originalConsoleWarn.apply(console, args);
  }
};

// Test function untuk spam click
function testSpamClick() {
  const trigger = document.querySelector('[data-radix-dropdown-menu-trigger]');
  if (!trigger) {
    console.log('❌ No dropdown trigger found');
    return;
  }
  
  console.log('🚀 Starting spam click test...');
  console.log('📊 Initial warning count:', warningCount);
  
  let clickCount = 0;
  const maxClicks = 10;
  
  const spamClick = () => {
    if (clickCount < maxClicks) {
      clickCount++;
      console.log(`🖱️ Click ${clickCount}/${maxClicks}`);
      
      // Simulate click
      trigger.click();
      
      // Wait a bit then click again
      setTimeout(spamClick, 100);
    } else {
      // Test finished
      setTimeout(() => {
        console.log('✅ Spam click test completed!');
        console.log(`📈 Total accessibility warnings: ${warningCount}`);
        
        if (warningCount === 0) {
          console.log('🎉 PERFECT! No spam warnings detected!');
        } else if (warningCount <= 2) {
          console.log('✅ GOOD! Very few warnings (acceptable)');
        } else if (warningCount <= 5) {
          console.log('⚠️ OKAY! Some warnings but manageable');
        } else {
          console.log('❌ BAD! Too many warnings - fix needed');
        }
        
        // Restore original console.warn
        console.warn = originalConsoleWarn;
      }, 1000);
    }
  };
  
  spamClick();
}

// Auto run test
console.log('Starting test in 2 seconds...');
setTimeout(testSpamClick, 2000);

// Manual test function
window.testDropdownSpam = testSpamClick;

console.log('📝 Manual test available: window.testDropdownSpam()');