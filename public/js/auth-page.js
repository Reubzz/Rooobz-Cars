const form = document.querySelector('form')
const fullName = document.querySelector('#name')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const email = document.querySelector('#email')
// const display = document.querySelector('#error')
const submitBtn = document.querySelector('#submit').value.toLowerCase()
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    // display.textContent = ''

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
            email: email.value
        });
    }
})


async function authApi(apiEndPoint, bodyOptions) {
    try {
        const res = await fetch('/api/auth/' + apiEndPoint, {
            method: 'POST',
            body: JSON.stringify(bodyOptions),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (res.status === 400 || res.status === 401) {
            // display.classList.add("error")
            // console.log(display)
            // return display.textContent = `${data.error.code}. ${(data.error.code != 100) ? data.error.message : ''}`
            return alert(`${data.error.code}. ${(data.error.code != 100) ? data.error.message : ''}`)
        }
        data.role === "basic" ? window.location.replace(document.referrer) : window.location.replace(document.referrer)
    } catch (err) {
        console.log(err.message)
    }
}