const flashMessages = document.querySelectorAll('.flash');
const addProductForm = document.querySelector('form[action="/owner/products"]');

for (let i = 0; i < flashMessages.length; i++) {
    setTimeout(function() {


        flashMessages[i].style.transition = 'opacity 0.3s';
        flashMessages[i].style.opacity = '0';
        setTimeout(function() {
            flashMessages[i].remove();
        }, 300);



    }, 4000);
}

if (addProductForm) {

    addProductForm.addEventListener('submit', function(e) {
        const button = this.querySelector('button');
        const originalText = button.textContent;

        
        button.textContent = 'Adding...';
        
        button.disabled = true;

        button.style.background = 'rgb(51, 51, 51)';
    });
}