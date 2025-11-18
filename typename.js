// typing-effect-final.js - Bulletproof version
function safeTypeWriter(element, text, speed = 150) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add blinking cursor
      element.style.borderRight = '2px solid #5865f2';
      setInterval(() => {
        element.style.borderRight = element.style.borderRight ? '' : '2px solid #5865f2';
      }, 500);
    }
  }
  
  type();
}

function findUsername(maxTries = 10) {
  const selectors = [
    'h1', 
    'h1.tptitle',
    '.profile-text-content h1',
    'h1.text-4xl', 
    'h1.font-bold',
    'h1[class*="text-4xl"]'
  ];
  
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent && element.textContent.trim()) {
      return element;
    }
  }
  return null;
}

// Keep trying to find username element
function waitForUsername(tryCount = 0) {
  if (tryCount > 15) { // Max 15 seconds
    console.warn('Gave up waiting for username element');
    return;
  }
  
  const username = findUsername();
  
  if (username) {
    console.log('Found username element:', username, 'with text:', username.textContent);
    const originalText = username.textContent.trim();
    if (originalText) {
      safeTypeWriter(username, originalText);
    }
  } else {
    // Try again in 1 second
    setTimeout(() => waitForUsername(tryCount + 1), 1000);
  }
}

// Start waiting immediately
waitForUsername();
