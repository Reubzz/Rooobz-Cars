// Initialize Stripe.js using your publishable key
const stripe = Stripe('pk_test_51OriCPSJAPyxY5J1IDelmX4MbtJeX6fxbMQwe6IvPydOiWEZOVW6nCFWg9ayvTbN8NjjqpGe3R3AZNtMq1PERyEW00xa8FcsYe');
// Retrieve the "payment_intent_client_secret" query parameter appended to
// your return_url by Stripe.js
const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
);

// Retrieve the PaymentIntent
stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
    const message = document.querySelector('#message')
  
    // Inspect the PaymentIntent `status` to indicate the status of the payment
    // to your customer.
    //
    // Some payment methods will [immediately succeed or fail][0] upon
    // confirmation, while others will first enter a `processing` state.
    //
    // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    switch (paymentIntent.status) {
        case 'succeeded':
            break;
    
        case 'processing':
            showError({
                error: 105,
                message: "Payment processing. We'll update you when payment is received."
            })
            break;
    
        case 'requires_payment_method':
            showError({
                error: 105,
                message: 'Payment failed. Please try another payment method.'
            })
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            break;
    
        default:
            showError({
                error: 105,
                message: 'Something went wrong.'
            })
            break;
    }
});

async function transactionComplete() {
    try {
        const orderId = new URLSearchParams(window.location.search).get(
            'orderid'
        );
        const res = await fetch(`/api/transaction/complete?orderid=${orderId}`, {
            method: 'POST',
            body: JSON.stringify({ orderId: orderId }),
            headers: { 'Content-Type': 'application/json' },
        })
        const res2 = await fetch(`/api/booking/book-car-dates?orderid=${orderId}`, {
            method: 'POST',
            body: JSON.stringify({ orderId: orderId }),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();
        const data2 = await res2.json();

        if (res.status == 401 || res.status == 400) {
            showError({
                error: data.error.code,
                message: data.error.message
            })
        }
        if (res2.status == 401 || res2.status == 400) {
            showError({
                error: data2.error.code,
                message: data2.error.message
            })
        }
    }
    catch (e) {
        console.log(e);
        alert(e)
    }
}

transactionComplete();