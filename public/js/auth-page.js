const form = document.querySelector('form')
const fullName = document.querySelector('#name')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const repassword = document.querySelector('#re-password')
const email = document.querySelector('#email')
const display = document.querySelector('#error')
const submitBtn = document.querySelector('#submit').value.toLowerCase()

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    display.textContent = ''

    
    // ? if Login Page
    if (submitBtn == 'login') {
        authApi('login', bodyOptions = {
            username: username.value,
            password: password.value
        });
    }
    
    // ? If Register user page
    
    if (submitBtn == 'register') {
        // ! Standard Form Inputs Checking
        // ! Check If password - re-enter password is same value
        if (password.value != repassword.value) {
            showError({
                code: '401',
                message: 'Passwords do not match. Please Try again'
            })
            repassword.value = '';
            repassword.style.border = 'thin solid red';
            return;
        }
        
        authApi('register', bodyOptions = {
            name:  fullName.value,
            username: username.value,
            password: password.value,
            email: email.value,
            role: 'basic'
        });
    }
})


async function authApi(apiEndPoint, bodyOptions) {
    try {
        const res = await fetch(`/api/auth/${apiEndPoint}`, {
            method: 'POST',
            body: JSON.stringify(bodyOptions),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()

        // ! If Unsuccessful Login - Error
        if (res.status === 400 || res.status === 401) {
            showError({
                error: data.error.code,
                message: data.error.message
            })
            return;
        }
        
        // ! If Success Login
        if(res.status === 200) {
            window.location.reload();
            if(getCookie('redirectToUrl') != null) {
                window.location.replace(getCookie('redirectToUrl'));
                deleteCookie('redirectToUrl');
                return; 
            }
            return window.location.replace('/'); 
        }
    } catch (err) {
        // ! If Unknown errors
        console.log(err.message)
    }
}

function getCookie(name) {
    const cookiesObject = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
    return cookiesObject[name] ? cookiesObject[name] : null;
}

function deleteCookie(cookieName) {
    // Set the cookie's expiration date to a past date
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}