let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("image-slideshow");
    let dots = document.getElementsByClassName("dot");

    if (slides.length == 0) return;
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function openTab(titleElement, tabname) {
    const content = document.getElementById(tabname + '-content')
    const contentWrapper = document.getElementsByClassName('content')
    const tabsWrapper = document.getElementsByClassName('tab-title')
    // Hide all tabs and set clicked one to display block
    for (let i = 0; i < contentWrapper.length; i++) {
        contentWrapper[i].style.display = 'none'
        tabsWrapper[i].classList.remove('active')
    }
    titleElement.classList.add('active')
    content.style.display = 'block'
}
openTab(document.getElementById('included-tab-title'), 'included')

function bookNow(id) {
    if (!user.id) {
        showLoginModal();
        return;
    }
    else {
        return window.location.href = `/booking?id=${id}`;
    }
}


function showLoginModal() {
    const loginModal = document.getElementById('login-register-modal');
    loginModal.style.display = 'flex';
}
function closeLoginModal() {
    const loginModal = document.getElementById('login-register-modal');
    loginModal.style.display = 'none';
}
window.onclick = function (event) {
    const loginModal = document.getElementById('login-register-modal');
    if (event.target == loginModal) {
        closeLoginModal()
    }
}

let stars = document.getElementsByClassName("fa-star");
let starsNumber = document.getElementById('rating-star-number');

var currentRating = 0;

stars = Array.prototype.slice.call(stars);

stars.forEach((star, index) => {
    star.addEventListener("click", (e) => {
        for (let i = 0; i < stars.length; i++) {
            stars[i].style.color = "";
        }
        colorStar(index);
        currentRating = index + 1
        starsNumber.value = currentRating
    },
        false
    );
});

const colorStar = (n) => {
    if (n < 0) return;
    stars[n].style.color = "#fc0";
    colorStar(n - 1);
};

const reviewForm = document.getElementById('add-review')
reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // TODO: Add API 
})