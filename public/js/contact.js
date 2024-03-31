// TODO: Contact US form API 
const form = document.getElementById("contact-us-form");

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fomrdata = new FormData(form)
    const res = await fetch('/api/contact', {
        method: "POST",
        body: fomrdata
    })
    const data = await res.json();

    console.log(data)
    if (data.status.code != 200) {
        showError({
            error: data.error.code,
            message: data.error.messsage
        })
        return;
    }
    showError({
        error: 200,
        message: "Message Sent Successfully"
    });
    return;
});
