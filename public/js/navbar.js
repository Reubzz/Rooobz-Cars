// ? Opens and Closes Mobile Navigation Bar 
function openMobileMenu(menu) {
    document.getElementById(menu).classList.toggle('open')
}


// ? This function that serves as an event listener for a click event. The function checks if the clicked element matches any element inside the #hamburger-menu element. If the clicked element does not match, the function removes the open class from the #hamburger-menu element, which presumably hides the hamburger menu.
document.onclick = function(x) {
    if (!x.target.matches("#hamburger-menu *")) {
        document.getElementById('hamburger-menu').classList.remove('open')
    }
}

const loginBtnDesktop = document.getElementById('login-btn-desktop');
const registerBtnDesktop = document.getElementById('register-btn-desktop');
const loginBtnMobile = document.getElementById('login-btn-mobile');
const loginregistertnMobile = document.getElementById('register-btn-mobile');

console.log(loginBtnDesktop)
loginBtnDesktop.onclick = () => {
    // let popupURL = browser.extension.getURL("popup/popup.html");

    // let creating = browser.windows.create({
    //     url: popupURL,
    //     type: "popup",
    //     height: 200,
    //     width: 200,
    // }); 
    // creating.then(onCreated, onError);
    browser.windows.create()
}


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 1 day 
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}