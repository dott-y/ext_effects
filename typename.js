// typing-effect.js - Final working version
function typeWriter(element, text, speed = 150) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.style.borderRight = '2px solid #5865f2';
      setInterval(() => {
        element.style.borderRight = element.style.borderRight ? '' : '2px solid #5865f2';
      }, 500);
    }
  }
  
  type();
}

function waitForProfileElements(callback, timeout = 10000) {
  const checkElements = () => {
    const username = document.querySelector('h1') || 
                     document.querySelector('h1[class*="text-4xl"]') ||
                     document.querySelector('[class*="profile-text-content"] h1');
    
    if (username && username.textContent && username.textContent.trim()) {
      callback(username);
    } else {
      setTimeout(checkElements, 100);
    }
  };
  
  checkElements();
  setTimeout(() => callback(null), timeout);
}

// Wait for profile to load, then apply typing effect
waitForProfileElements((username) => {
  if (username) {
    const originalText = username.textContent.trim();
    console.log('Applying typing effect to:', originalText);
    typeWriter(username, originalText);
  } else {
    console.warn('Typing effect: Username element not found after waiting');
  }
});
