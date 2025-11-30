const flashMsg = document.querySelectorAll('.flash');
const orderForm = document.querySelector('form[action*="/order/create"]');

for (let i = 0; i < flashMsg.length; i++) {
    setTimeout(function() {
        flashMsg[i].style.transition = 'opacity 0.3s';
        flashMsg[i].style.opacity = '0';
        setTimeout(function() {
            flashMsg[i].remove();
        }, 300);
    }, 4000);
}

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        const btn = this.querySelector('button');
        const text = btn.textContent;
        
        btn.textContent = 'Processing...';
        btn.disabled = true;
        btn.style.background = 'rgb(51, 51, 51)';
    });
}