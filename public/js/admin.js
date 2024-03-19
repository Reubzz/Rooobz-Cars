function changeTab(tab, contentType, contentTab) {
    const allTabs = document.getElementsByClassName('clickable-element');
    for (i=0; i<allTabs.length; i++) allTabs[i].classList.remove('selected')

    tab.classList.add('selected');
    
    const data = document.getElementsByClassName('data-card');
    for(i=0; i<data.length; i++) data[i].classList.add('hidden'); 
    
    const contentElems = document.getElementsByClassName(`${contentType}-${contentTab}`)
    for(i=0; i<contentElems.length; i++) contentElems[i].classList.remove('hidden');
    
}

function openDropDown(element, dropdown, dropdownElements = null) {
    element.classList.toggle('selected')
    document.getElementById(dropdown).classList.toggle('hidden')
}

openDropDown(document.getElementsByClassName('clickable-element')[0], 'bookings-dropdown')
changeTab(document.getElementsByClassName('clickable-element')[1], 'booking', 'completed')


// ! API Calls for Buttons Below

// ! Unsubscribe API
async function unsubscribeUser(id, element) {
    const elementCard = element.parentElement.parentElement
    const res = await fetch('/api/subscribe', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    const data = await res.json();
    if(data.status.code == 201) {
        elementCard.remove()
    }
}