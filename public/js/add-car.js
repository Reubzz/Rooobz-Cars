// * Payment Form
const addCarForm = document.getElementById('carForm');
addCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCarForm);

    // ! Validate fields
    try {
        const res = await fetch('/api/cars/add', {
            method: 'POST',
            // body: JSON.stringify(Object.fromEntries(formData)),
            body: formData,
        })
        const data = await res.json();

        // ! If Unseccessful
        if(res.status == 400 || res.status == 401) {
            showError({
                code: data.error.code,
                message: data.error.message
            })
            return;
        }

        if(res.status == 200) {
            window.location.replace(`${window.location.origin}/admin?tab=car-available-tab`);
            alert('success')
        }
    } catch (error) {
        // ! IF unknown errors
        console.log('error in add-car.js - /public/js : ', error.message);      
    }
})
