const flashMessages = document.querySelectorAll('.flash');

for (let i = 0; i < flashMessages.length; i++) {
    setTimeout(function() {
        flashMessages[i].style.transition = 'opacity 0.3s';
        flashMessages[i].style.opacity = '0';
        setTimeout(function() {
            flashMessages[i].remove();
        }, 300);
    }, 4000);
}