function changeTab(tab, contentTab) {
    const allTabs = document.getElementsByClassName('tab-title');
    for (i=0; i<allTabs.length; i++) allTabs[i].classList.remove('selected')

    tab.classList.add('selected');
    
    const orderData = document.getElementsByClassName('booking');
    for(i=0; i<orderData.length; i++) orderData[i].classList.add('hidden'); 
    
    const contentElems = document.getElementsByClassName(`booking-${contentTab}`)
    for(i=0; i<contentElems.length; i++) contentElems[i].classList.remove('hidden');
    
}
changeTab(document.getElementsByClassName('tab-title')[0], 'completed')

function payNow(orderid) {
    window.location.href = `/booking/pay?id=${orderid}`
}

async function cancelBooking(orderid) {
    const res = await fetch(`/api/booking/cancel-order?orderid=${orderid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    const data = await res.json();

    if (res.status == 400 || res.status == 401 ) {
        alert("Error cancelling booking");
        return;
    }
    
    if (res.status == 200) {
        window.location.reload();
    }
}