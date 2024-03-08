const stripe = Stripe('pk_test_51OriCPSJAPyxY5J1IDelmX4MbtJeX6fxbMQwe6IvPydOiWEZOVW6nCFWg9ayvTbN8NjjqpGe3R3AZNtMq1PERyEW00xa8FcsYe');

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
    const checkBoxElem = document.getElementById(`offer-${element.dataset.offerId}`)

    // ! For Removing the Offer to Cart 
    if(element.classList[0] == 'offer-remove') {
        finalOffersPrice.innerHTML = Number.parseInt(finalOffersPrice.innerHTML) - offerPrice
        checkBoxElem.checked = false;
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
        checkBoxElem.checked = true;
        allOffers.push(`${element.dataset.offerId}`)
        console.log(allOffers)
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

// * GOOGLE MAPS API
const autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
// Optionally, set restrictions on the types of places suggested
// autocomplete.setTypes(['geocode']);
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
                error: data.error.code,
                message: data.error.message
            })
            return;
        }

        // // ! If Successful 
        // if(res.status == 200) {
        //     // TODO: Add success response function here
        //     payNowFrom.style.display = 'none'
        //     document.getElementById('payment-form-container').style.display = "flex";

        //     const options = {
        //         clientSecret: `${data.client_secret}`,
        //         // Fully customizable with appearance API.
        //         appearance: {
        //             theme: 'stripe',
        //             variables: {
        //                 colorPrimary: '#FF4C30',
        //                 colorBackground: '#ffffff',
        //                 colorText: '#FF4C30',
        //                 colorDanger: '#df1b41',
        //                 fontFamily: 'Rubik, sans-serif',
        //                 spacingUnit: '5px',
        //                 borderRadius: '10px',
        //                 fontSizeSm: '1.4rem',
        //                 fontSizeBase: '1rem',
        //                 gridColumnSpacing: '20px',
        //                 gridRowSpacing: '20px',
        //             },
        //         },
        //     };
              
        //     // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in a previous step
        //     const elements = stripe.elements(options);
            
        //     // Create and mount the Payment Element
        //     const paymentElement = elements.create('payment');
        //     paymentElement.mount('#payment-element');
            
        //     paymentForm.addEventListener('submit', async (event) => {
        //         event.preventDefault();
            
        //         const {error} = await stripe.confirmPayment({
        //                 //`Elements` instance that was used to create the Payment Element
        //                 elements,
        //                 confirmParams: {
        //                 return_url: 'http://localhost/order/complete',
        //             },
        //         });
            
        //         if (error) {
        //             // This point will only be reached if there is an immediate error when
        //             // confirming the payment. Show error to your customer (for example, payment
        //             // details incomplete)
        //             const messageContainer = document.querySelector('#error-message');
        //             messageContainer.textContent = error.message;
        //         } else {
        //             // Your customer will be redirected to your `return_url`. For some payment
        //             // methods like iDEAL, your customer will be redirected to an intermediate
        //             // site first to authorize the payment, then redirected to the `return_url`.
        //         }
        //     });
        //     return;
        // }

        if(res.status == 200) {
            window.location.href = `/booking/pay?id=${data.orderId}`;
        }
    } catch (error) {
        // ! IF unknown errors
        console.log('error in booking.js - /public/js : ', error.message);      
    }
})
