const flashMessages = document.querySelectorAll('.flash');
const addToCartForm = document.querySelector('form[action*="/cart/add"]');

for (let i = 0; i < flashMessages.length; i++) {
    setTimeout(function() {
        flashMessages[i].style.transition = 'opacity 0.3s';
        flashMessages[i].style.opacity = '0';
        setTimeout(function() {
            flashMessages[i].remove();
        }, 300);
    }, 4000);
}

if (addToCartForm) {
    addToCartForm.addEventListener('submit', function(e) {
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Adding...';
        button.disabled = true;
        
        setTimeout(function() {
            button.textContent = 'Added to Cart!';
            button.style.background = 'rgb(51, 51, 51)';
            
            setTimeout(function() {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 1500);
        }, 500);
    });
}