// Select all elements with class 'tptitle'
const titles = document.querySelectorAll('.tptitle');

titles.forEach(title => {
    const fullText = title.getAttribute('data-text') || '';
    let index = 0;

    function type() {
        title.textContent = fullText.slice(0, index);
        index++;

        if (index <= fullText.length) {
            setTimeout(type, 100); // typing speed in ms
        }
    }

    type();
});
