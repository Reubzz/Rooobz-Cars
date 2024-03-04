function offerHover(element) {
    element.children[1].children[0].innerHTML = `Rs. ${element.dataset.offerPrice}`
}
function offerHoverRemove(element) {
    let button = element.children[1].children[0]
    button.innerHTML = button.classList.contains('offer-add') ? button.dataset.addText : button.dataset.removeText;
}

function offerAddRemove(event, element) {
    event.preventDefault();
    const offerPrice = Number.parseInt(element.parentNode.parentNode.dataset.offerPrice);
    const finalOffersPrice = document.getElementById('offers-final-price');

    if(element.classList[0] == 'offer-remove') {
        finalOffersPrice.innerHTML = Number.parseInt(finalOffersPrice.innerHTML) - offerPrice
        element.innerHTML = element.dataset.addText;
        element.classList.remove('offer-remove')
        element.classList.add('offer-add')
        updateFinalPrice();
        return;
    }
    if(element.classList[0] == 'offer-add') {
        finalOffersPrice.innerHTML = Number.parseInt(finalOffersPrice.innerHTML) + offerPrice
        element.innerHTML = element.dataset.removeText;
        element.classList.remove('offer-add')
        element.classList.add('offer-remove')
        updateFinalPrice()
        return;
    }    
}

function updateFinalPrice() {
    const bookNowBtn = document.getElementById('book-now-btn');
    const totalDisplay = document.getElementById('total-display');
    const finalOffersPrice = document.getElementById('offers-final-price').innerHTML;
    const carPrice = car.price;
    const gst = 18/100;

    const finalAmount = Number.parseInt(finalOffersPrice) + carPrice + (carPrice * gst); 
    bookNowBtn.innerHTML = `Pay Now • Rs. ${finalAmount}`
    totalDisplay.innerHTML = finalAmount
    return finalAmount;
}

const payNowFrom = document.getElementById('pay-now-form');
payNowFrom.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(payNowFrom);
    formData.append('carId', car.id)
    formData.append('final-price', updateFinalPrice())
    formData.append('username', user.username)
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('role', user.role)
    formData.append('id', user.id)

    // ! DEBuG
    console.log(formData)
    console.log(formData.get('phone'))
    
    
    // Validate fields
    
})