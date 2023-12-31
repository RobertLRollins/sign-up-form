document.addEventListener('DOMContentLoaded', function() {
    // Collect all input elements with class 'text' and convert to an array for easy iteration
    let inputs = document.getElementsByClassName('text');
    let inputsArray = Array.from(inputs);
    
    // Add blur and focus event listeners to each input field
    inputsArray.forEach(function(inputField) {
        // Validate the input on blur (when it loses focus)
        inputField.addEventListener('blur', function() {
            let isInvalid = false;

            // Validate telephone and email inputs with custom logic
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

            // Toggle the 'error' class based on validation results
            if(isInvalid) {
                inputField.classList.add('error');
            } else {
                inputField.classList.remove('error');
            }
        });

        // Remove the 'error' class when the field gains focus
        inputField.addEventListener('focus', function() {
            inputField.classList.remove('error');
        });
    });

    // Select various elements by their ID
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
    
    // Function to validate that the passwords match
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

    // Attach blur event to password fields for validation
    pwdInput.addEventListener('blur', validatePasswords);
    confirmPwdInput.addEventListener('blur', validatePasswords);
    
    // Function to reset all inputs to their original state
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

    // Function to disable an input
    function disableInput(input) {
        input.disabled = true;
        input.required = false;
        input.classList.add('disabled');
        if (input.parentNode.querySelector('span[aria-label="required"]')) {
            input.parentNode.querySelector('span[aria-label="required"]').style.display = 'none';
        }
    }

    // Function to enable an input
    function enableInput(input) {
        input.disabled = false;
        input.required = true;
        input.classList.remove('disabled');
        if (input.parentNode.querySelector('span[aria-label="required"]')) {
            input.parentNode.querySelector('span[aria-label="required"]').style.display = 'inline';
        }
    }
    
    // Function to disable unselected contact methods based on preferred selection
    function disableUnselectedContactMethods() {
        [emailInput, cellInput, neuralinkInput].forEach(disableInput);

        let preferredContact = preferredSelect.value;
        if (preferredContact === 'email') enableInput(emailInput);
        if (preferredContact === 'cell') enableInput(cellInput);
        if (preferredContact === 'link') enableInput(neuralinkInput);
    }

    // Event handler for changes in preferred contact method
    function handlePreferredChange() {
        if (anonRadio.checked) {
            disableUnselectedContactMethods();
        }
    }

    // Event handler for changes in account type selection
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

    // Attach change event listeners to radio buttons and the preferred select
    [acctRadio, noRadio, anonRadio].forEach(radio => {
        radio.addEventListener('change', handleAccountSelectionChange);
    });
    preferredSelect.addEventListener('change', handlePreferredChange);

    // Initialize form state based on current selection
    handleAccountSelectionChange();
});
