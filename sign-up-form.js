/* 
Do this in actual javaScript:
addEventListener when an input is focused or unfocused
    if (input is not empty/placeholder && pattern is not matched && input is not focused) {
        add .error to that input
    } 
*/

let inputs = document.getElementsByClassName('text');

let inputsArray = Array.from(inputs);

inputsArray.forEach(function(inputField) {
    inputField.addEventListener('blur', function() {
       
        let isInvalid = false;

        if(inputField.type === "tel" && inputField.getAttribute('pattern')) {
            var pattern = new RegExp(inputField.getAttribute('pattern'));
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