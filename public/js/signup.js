const userRoleElement = document.getElementById('userRole');
const ownerRoleElement = document.getElementById('ownerRole');
const gstField = document.getElementById('gstField');
const signupForm = document.getElementById('signupForm');

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
    
    if (role === 'owner') {
        gstField.style.display = 'block';
        gstField.querySelector('input').setAttribute('required', 'true');
    } else {
        gstField.style.display = 'none';
        gstField.querySelector('input').removeAttribute('required');
    }
}

userRoleElement.addEventListener('click', function() {
    selectRole(this, 'user');
});

ownerRoleElement.addEventListener('click', function() {
    selectRole(this, 'owner');
});

signupForm.addEventListener('submit', function() {
    const selectedRoleInput = document.querySelector('input[name="role"]:checked');
    const selectedRole = selectedRoleInput.value;
    
    if (selectedRole === 'owner') {
        this.action = '/owner/register';
    } else {
        this.action = '/user/register';
    }
});