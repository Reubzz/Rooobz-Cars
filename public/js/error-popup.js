// * Show Error Popup
function showError({ code, message}) {
    const display = document.getElementById('error')
    display.classList.add("error")
    display.textContent = `${(code == 200) ? "" : "Error "+ code + " -"} ${(code != 100) ? message : ''}`
    setTimeout(() => {
        display.classList.remove('error')
    }, 10 * 1000)
    return;
}