const flashMessages = document.querySelectorAll('.flash');
const addToCartForms = document.querySelectorAll('form[action*="/cart/add"]');

for (let i = 0; i < flashMessages.length; i++) {
    setTimeout(function() {
        flashMessages[i].style.transition = 'opacity 0.3s';
        flashMessages[i].style.opacity = '0';
        setTimeout(function() {
            flashMessages[i].remove();
        }, 300);
    }, 4000);
}

for (let i = 0; i < addToCartForms.length; i++) {
    addToCartForms[i].addEventListener('submit', function(e) {
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Adding...';
        button.disabled = true;
        button.style.background = 'rgb(51, 51, 51)';
        
        setTimeout(function() {
            button.textContent = 'Added!';
            setTimeout(function() {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 1000);
        }, 500);
    });
}