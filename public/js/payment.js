const stripe = Stripe('pk_test_51OriCPSJAPyxY5J1IDelmX4MbtJeX6fxbMQwe6IvPydOiWEZOVW6nCFWg9ayvTbN8NjjqpGe3R3AZNtMq1PERyEW00xa8FcsYe');

const options = {
    clientSecret: `${client_secret}`,
    // Fully customizable with appearance API.
    appearance: {
        theme: 'stripe',
        variables: {
            colorPrimary: '#FF4C30',
            colorBackground: '#ffffff',
            colorText: '#FF4C30',
            colorDanger: '#df1b41',
            fontFamily: 'Rubik, sans-serif',
            spacingUnit: '5px',
            borderRadius: '10px',
            fontSizeSm: '1.4rem',
            fontSizeBase: '1rem',
            gridColumnSpacing: '20px',
            gridRowSpacing: '20px',
        },
    },
};

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in a previous step
const elements = stripe.elements(options);

// Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
const paymentForm = document.getElementById('payment-form');
const orderId = new URLSearchParams(window.location.search).get(
    'id'
);


paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    

    const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
            return_url: `${window.location.origin}/booking/complete?orderid=${orderId}`,
        },
    });

    if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
    } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
    }
});
