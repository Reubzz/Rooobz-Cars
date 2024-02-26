// const form = document.querySelector('form');
// const email = document.getElementById('subscribe-email').value;
// const submitBtn = document.getElementById('subscribe-submit')
// const confirmMessage = document.getElementById('confirm-message');
// confirmMessage.classList.add('show');

// $('#subscribe-submit').click(async function () {
//     console.log('hello')
//     const email = $('subscribe-email').value
//     console.log($('subscribe-email').value) // ! debug
//     try {
//         const res = await fetch(`/api/subscribe`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: email,
//             }),
//             headers: { 'Content-Type': 'application/json' },
//         })
//         const data = await res.json();

//         // ! If unsuccessful
//         if (res.status == 400) {
//             showMessage(`Error ${data.error.code} - ${data.error.message}`);
//             email = '';
//             return;
//         }

//         // ! If Success 
//         if (res.status == 200) {
//             showMessage(data.status.message);
//             email = '';
//             return;
//         }
//     } catch (error) {
//         // ! Unkown Error
//         showMessage(`Error - ${error.message}`);
//         email = '';
//         console.log(error.message)
//         return;
//     }
// })

async function emailSubmit(email) {
    // const email = $('subscribe-email').value
    try {
        const res = await fetch(`/api/subscribe`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();
    
        // ! If unsuccessful
        if (res.status == 400 || res.status == 401) {
            showMessage(`Error ${data.error.code} - ${data.error.message}`);
            email = '';
            return;
        }
    
        // ! If Success 
        if (res.status == 200) {
            showMessage(data.status.message);
            email = '';
            return;
        }
    } catch (error) {
        // ! Unkown Error
        showMessage(`Error - ${error.message}`);
        email = '';
        console.log(error.message)
        return;
    }
}
function showMessage(text) {
    const messageElem = document.getElementById('confirm-message')
    messageElem.classList.add('show');
    messageElem.textContent = text;
    setTimeout(() => {
        messageElem.classList.remove('show');
    }, 10 * 1000);
}

