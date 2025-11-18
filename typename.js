// typing-effect.js
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

// Apply to username
const username = document.querySelector('h1') || document.querySelector('.tptitle');
if (username) {
  const originalText = username.textContent;
  typeWriter(username, originalText, 150);
}
