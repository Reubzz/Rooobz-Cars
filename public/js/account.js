// All Inputs
const usernameInput = document.getElementById('username-input');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');

// All Buttons
const usernameBtn = document.getElementById('username-button')
const nameBtn = document.getElementById('name-button')
const emailBtn = document.getElementById('email-button')

function editButtonClick(button) {
    let inputElement = document.getElementById(button.dataset.input);
    // inputElement.disabled = !inputElement.disabled;

    if(button.id == `${button.dataset.fieldname}-edit`) {
        inputElement.disabled = false;
    }   
    else if(button.id == `${button.dataset.fieldname}-submit`) {
        inputElement.disabled = true;
        submitField(inputElement, button.dataset.fieldname, button);
    }
    changeButton(button.dataset.fieldname, button)
}




// * Change Button Types
function changeButton(fieldName, button) {
    if (button.id == `${fieldName}-edit`) {
        button.innerHTML = 'Save <i class="fas fa-save"></i>';
        button.id = `${fieldName}-submit`;
        // button.type = 'submit'
    }
    else if (button.id == `${fieldName}-submit`) {
        button.innerHTML = 'Edit <i class="fas fa-pen"></i>'
        button.id = `${fieldName}-edit`;
    }
}

// * When User Submits the Data
async function submitField(inputElement, fieldName, button) {
    try {
        const res = await fetch(`/api/account/edit`, {
            method: 'POST',
            body: JSON.stringify({
                [fieldName]: inputElement.value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();

        // ! If Unsuccessful 
        if (res.status == 400 || res.status == 401) { 
            inputElement.value = inputElement.dataset.initialdata;
            showError({
                error: data.error.code,
                message: data.error.message
            })
            return;
        }

        // ! If Sucess
        if (res.status == 200) {
            window.location.reload();
            return; 
        }
    } catch (error) {
        // ! If Unknown Errors
        console.log('error in submitField() in account.js in public/js', error.message)
    }
}

// * Show Error Popup
function showError({ code, message}) {
    const display = document.getElementById('error')
    display.classList.add("error")
    display.textContent = `Error ${code} - ${(code != 100) ? message : ''}`
    setTimeout(() => {
        display.classList.remove('error')
    }, 10 * 1000)
    return;
}


// * Image Upload Section
const formElement = document.getElementById('image-form-wrapper');
function openPfpDialog() {
    formElement.classList.add('open');
}

function closePfpDialog() {
    formElement.classList.remove('open')
}
window.onclick = function(event) {
    if (event.target == formElement) {
        closePfpDialog()
    }
}
