const userRoleElement = document.getElementById('userRole');
const ownerRoleElement = document.getElementById('ownerRole');
const loginForm = document.getElementById('loginForm');

function selectRole(selectedElement, role) {
    const allRoleOptions = document.querySelectorAll('.option');
    for (let i = 0; i < allRoleOptions.length; i++) {
        allRoleOptions[i].classList.remove('active');
    }
    
    selectedElement.classList.add('active');
    
    const allRoleInputs = document.querySelectorAll('input[name="role"]');
    for (let i = 0; i < allRoleInputs.length; i++) {
        allRoleInputs[i].checked = false;
    }
    
    const selectedInput = document.querySelector('input[value="' + role + '"]');
    selectedInput.checked = true;
}

userRoleElement.addEventListener('click', function() {
    selectRole(this, 'user');
});

ownerRoleElement.addEventListener('click', function() {
    selectRole(this, 'owner');
});

loginForm.addEventListener('submit', function() {
    const selectedRoleInput = document.querySelector('input[name="role"]:checked');
    const selectedRole = selectedRoleInput.value;
    
    if (selectedRole === 'owner') {
        this.action = '/owner/login';
    } else {
        this.action = '/user/login';
    }
});