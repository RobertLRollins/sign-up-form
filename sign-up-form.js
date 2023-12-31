//when an input gets disabled add the disabbled class to it
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
    let userNameInput = document.getElementById('userName');
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let cellInput = document.getElementById('cell');
    let neuralinkInput = document.getElementById('neuralink');
    let preferredSelect = document.getElementById('preferred');
    let acctRadio = document.getElementById('acct');
    let noRadio = document.getElementById('no');
    let anonRadio = document.getElementById('anon');

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


    function resetToOriginal() {
        [userNameInput, pwdInput, confirmPwdInput, nameInput, emailInput, cellInput, neuralinkInput].forEach(input => {
            input.disabled = false;
            input.required = true;
            input.classList.remove('disabled')
            if (input.parentNode.querySelector('span[aria-label="required"]')) {
                input.parentNode.querySelector('span[aria-label="required"]').style.display = 'inline';
            }
        });
    }

    function disableInput(input) {
        input.disabled = true;
        input.required = false;
        input.classList.add('disabled');
        if (input.parentNode.querySelector('span[aria-label="required"]')) {
            input.parentNode.querySelector('span[aria-label="required"]').style.display = 'none';
        }
    }

    function enableInput(input) {
        input.disabled = false;
        input.required = true;
        input.classList.remove('disabled');
        if (input.parentNode.querySelector('span[aria-label="required"]')) {
            input.parentNode.querySelector('span[aria-label="required"]').style.display = 'inline';
        }
    }

    function disableUnselectedContactMethods() {
        [emailInput, cellInput, neuralinkInput].forEach(disableInput);

        let preferredContact = preferredSelect.value;
        if (preferredContact === 'email') enableInput(emailInput);
        if (preferredContact === 'cell') enableInput(cellInput);
        if (preferredContact === 'link') enableInput(neuralinkInput);
    }

    function handlePreferredChange() {
        if (anonRadio.checked) {
            disableUnselectedContactMethods();
        }
    }

    function handleAccountSelectionChange() {
        resetToOriginal();
        if (acctRadio.checked) {
        } else if (noRadio.checked) {
            [userNameInput, pwdInput, confirmPwdInput].forEach(disableInput);
        } else if (anonRadio.checked) {
            [userNameInput, pwdInput, confirmPwdInput, nameInput].forEach(disableInput);
            disableUnselectedContactMethods(); 
        }
    }

    [acctRadio, noRadio, anonRadio].forEach(radio => {
        radio.addEventListener('change', handleAccountSelectionChange);
    });
    preferredSelect.addEventListener('change', handlePreferredChange);

    handleAccountSelectionChange();
    
});
