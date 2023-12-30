//if this is what I already have what would it look like with that code added
let inputs = document.getElementsByClassName('text');
let inputsArray = Array.from(inputs);

inputsArray.forEach(function(inputField) {
    inputField.addEventListener('blur', function() {
       
        let isInvalid = false;

        if(inputField.type === "tel" && inputField.getAttribute('pattern')) {
            let pattern = new RegExp(inputField.getAttribute('pattern'));
            if(inputField.value !== "" && !pattern.test(inputField.value)) {
                isInvalid = true;
            }
        } else if(inputField.type === "email" && inputField.value !== "") {
            if(!inputField.checkValidity()) {
                isInvalid = true;
            }
        }

        if(isInvalid) {
            inputField.classList.add('error');
        } else {
            inputField.classList.remove('error');
        }
    });

    inputField.addEventListener('focus', function() {
        inputField.classList.remove('error');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let pwdInput = document.getElementById('pwd');
    let confirmPwdInput = document.getElementById('conPwd');

    function validatePasswords() {
        
        if(!pwdInput.value.trim() || !confirmPwdInput.value.trim()) {
            pwdInput.classList.remove('error');
            confirmPwdInput.classList.remove('error');
            return; 
        }

        if(pwdInput.value !== confirmPwdInput.value) {
            pwdInput.classList.add('error');
            confirmPwdInput.classList.add('error');
        } else {
            pwdInput.classList.remove('error');
            confirmPwdInput.classList.remove('error');
        }
    }

    
    pwdInput.addEventListener('blur', validatePasswords);
    confirmPwdInput.addEventListener('blur', validatePasswords);
    
});
