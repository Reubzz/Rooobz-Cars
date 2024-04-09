
let arrayOfBookings = []
if (car.orders) car.orders.forEach((order) => {
    if (order.status != 'cancelled' || order.status != 'refunded') arrayOfBookings.push(order.bookedDates)
});
const bookedDates = [].concat(...arrayOfBookings);

// ! Offer Settings 
function offerHover(element) {
    element.children[1].children[0].innerHTML = `Rs. ${element.dataset.offerPrice}`
}
function offerHoverRemove(element) {
    let button = element.children[1].children[0]
    button.innerHTML = button.classList.contains('offer-add') ? button.dataset.addText : button.dataset.removeText;
}

let allOffers = [] // * Array to store all offers IDs that are added
function offerAddRemove(event, element) {
    event.preventDefault();
    const offerPrice = Number.parseInt(element.parentNode.parentNode.dataset.offerPrice);
    const finalOffersPrice = document.getElementById('offers-final-price');

    // ! For Removing the Offer to Cart 
    if(element.classList[0] == 'offer-remove') {
        finalOffersPrice.innerHTML = Number.parseInt(finalOffersPrice.innerHTML) - offerPrice
        if ( allOffers.indexOf(`${element.dataset.offerId}`) != -1 ) allOffers.splice(allOffers.indexOf(`${element.dataset.offerId}`), 1)
        element.innerHTML = element.dataset.addText;
        element.classList.remove('offer-remove')
        element.classList.add('offer-add')
        updateFinalPrice();
        return;
    }
    
    // ! For Adding the Offer to Cart 
    if(element.classList[0] == 'offer-add') {
        finalOffersPrice.innerHTML = Number.parseInt(finalOffersPrice.innerHTML) + offerPrice
        allOffers.push(`${element.dataset.offerId}`)
        element.innerHTML = element.dataset.removeText;
        element.classList.remove('offer-add')
        element.classList.add('offer-remove')
        updateFinalPrice()
        return;
    }    
}

// ! Update Final Price.
function updateFinalPrice() {
    const bookNowBtn = document.getElementById('book-now-btn');
    const totalDisplay = document.getElementById('total-display');
    const finalOffersPrice = document.getElementById('offers-final-price').innerHTML;
    const gstDisplay = document.getElementById('gst-display');
    const carPrice = car.price;
    const gstPercent = 18/100;

    // Get Number of Days
    const startDate = moment(pickupDatePicker.value, "DD-MM-YYYY"); 
    const dropDate = moment(dropoffDatePicker.value, "DD-MM-YYYY"); 

    let diffDays = dropDate.diff(startDate, "days");
    if (diffDays <= 0) {
        diffDays = 1;
    }

    const finalCarPrice = carPrice * diffDays; 
    gstDisplay.innerHTML = (finalCarPrice * gstPercent).toFixed(2)
    const finalAmount = (Number.parseInt(finalOffersPrice) + finalCarPrice + (finalCarPrice * gstPercent)).toFixed(2); 
    bookNowBtn.innerHTML = `Pay Now • Rs. ${finalAmount}`
    totalDisplay.innerHTML = finalAmount
    return Number(finalAmount);
}

// * GOOGLE MAPS API
const autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
// Optionally, set restrictions on the types of places suggested
// autocomplete.setTypes(['geocode']);
autocomplete.setComponentRestrictions({'country': ['in']}); // Restrict Api to only India 
autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();

    const placenameField = document.getElementById('placename')
    const localityField = document.getElementById('locality')
    const cityField = document.getElementById('city')
    const stateField = document.getElementById('state')
    const pinCodeField = document.getElementById('pin')
    const countryField = document.getElementById('country')

    if (place.name) {
        placenameField.value = place.name;
    }
    // Check if the place has address components
    if (place.address_components) {
        place.address_components.forEach(component => {
            // Check the type of the address component and assign values accordingly
            let componentName = component.long_name;
            
            if (component.types.includes('sublocality_level_1')) {
                localityField.value = componentName
            } 
            else if (component.types.includes('locality')) {
                cityField.value = componentName
            } 
            else if (component.types.includes('administrative_area_level_1')) {
                stateField.value = componentName
            } 
            else if (component.types.includes('postal_code')) {
                pinCodeField.value = componentName
            } 
            else if (component.types.includes('country')) {
                countryField.value = componentName;
            }
        });
    }
});


// * Payment Form
const payNowFrom = document.getElementById('pay-now-form');
const paymentForm = document.getElementById('payment-form');
payNowFrom.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(payNowFrom);
    formData.append('carId', car._id)
    formData.append('finalPrice', updateFinalPrice())
    formData.append('username', user.username)
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('role', user.role)
    formData.append('userId', user._id)
    formData.append('offers', JSON.stringify(allOffers))

    // Validate fields
    // Check Date - If dropoff date is earlier  than pickup date, return an error message
    const startDate = moment(pickupDatePicker.value, "DD-MM-YYYY"); 
    const dropDate = moment(dropoffDatePicker.value, "DD-MM-YYYY"); 
    const  diffDays = dropDate.diff(startDate, "days");
    if (diffDays <= 0) {
        showError({
            code: 104,
            message: 'Drop off date must be later than Pick up date. Both Also cannot be the same date'
        })
        return;
    }

    // Check if the car is already booked on the days selected.
    // TODO : TO BE FIXED
    const dateArray = [];
    while (startDate.isSameOrBefore(dropDate, 'day')) {
        dateArray.push(startDate.format('DD-MM-YYYY'));
        startDate.add(1, 'days');
    }
    if (bookedDates.includes(dateArray)) {
        showError({
            code: 105, 
            message:'This car is already booked one of these dates.'
        })
        return;
    }
    
    try {
        const res = await fetch('/api/booking/order-create', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' },

        })
        const data = await res.json();

        // ! If Unseccessful
        if(res.status == 400 || res.status == 401) {
            // TODO: Show Error Response Here.
            showError({
                code: data.error.code,
                message: data.error.message
            })
            return;
        }

        if(res.status == 200) {
            window.location.href = `/booking/pay?id=${data.orderId}`;
        }
    } catch (error) {
        // ! IF unknown errors
        console.log('error in booking.js - /public/js : ', error.message);      
    }
})
