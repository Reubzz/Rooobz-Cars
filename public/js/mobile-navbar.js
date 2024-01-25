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
