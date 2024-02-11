const form = document.querySelector('form')
const fullName = document.querySelector('#name')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const email = document.querySelector('#email')
const display = document.querySelector('#error')
const submitBtn = document.querySelector('#submit').value.toLowerCase()

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    display.textContent = ''

    // if Login Page
    if (submitBtn == 'login') {
        authApi('login', bodyOptions = {
            username: username.value,
            password: password.value
        });
    }

    // If Register user page 
    if (submitBtn == 'register') {
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
        const res = await fetch(`/api/auth/${apiEndPoint}?callbackUrl=${document.referrer}`, {
            method: 'POST',
            body: JSON.stringify(bodyOptions),
            headers: { 'Content-Type': 'application/json' },
            // apiKey: "reubz123"
        })
        const data = await res.json()

        // ! If Unsuccessful Login - Error
        if (res.status === 400 || res.status === 401) {
            display.classList.add("error")
            display.textContent = `Error ${data.error.code} - ${(data.error.code != 100) ? data.error.message : ''}`
            setTimeout(() => {
                display.classList.remove('error')
            }, 10 * 1000)
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