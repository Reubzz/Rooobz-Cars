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

const openWindow = (pageUrl) => {
    // window.open('/login', 'User Login', 'scrollbars=yes,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=1000,top=1000')
    setCookie('redirectToUrl', window.location, 1);
    window.location.replace(pageUrl)
}


function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
        let date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // 1 day 
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; sameSite=Lax";
}


// When the user scrolls the page, execute myFunction

window.onscroll = function() {
    const navbar = document.getElementById("navbar");
    let sticky = navbar.offsetTop;
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
};

// theme-toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    // Save theme preference
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    localStorage.setItem('theme', theme);

    // Change Assets Dark / Light Mode
    const allElements = document.getElementsByClassName('dark-light-img')
    for(i=0; i<allElements.length; i++) allElements[i].src = allElements[i].dataset[theme];
};

// Apply stored theme preference on page load
window.onload = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    const allElements = document.getElementsByClassName('dark-light-img')
    for(i=0; i<allElements.length; i++) allElements[i].src = allElements[i].dataset[theme];
    
};