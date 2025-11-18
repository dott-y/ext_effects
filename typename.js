// typing-effect.js - Fixed version
function waitForSelector(selector, timeout = 5000) {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Timeout after the specified time
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add cursor blink
      element.style.borderRight = '2px solid #5865f2';
      setInterval(() => {
        element.style.borderRight = element.style.borderRight ? '' : '2px solid #5865f2';
      }, 500);
    }
  }
  
  type();
}

// Wait for username to be rendered, then apply typing
waitForSelector('h1').then((username) => {
  if (username) {
    const originalText = username.textContent;
    typeWriter(username, originalText, 150);
  } else {
    console.warn('Username element not found after waiting');
  }
});
