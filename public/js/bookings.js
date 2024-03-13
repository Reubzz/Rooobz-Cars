function changeTab(tab, contentTab) {
    const allTabs = document.getElementsByClassName('tab-title');
    for (i=0; i<allTabs.length; i++) allTabs[i].classList.remove('selected')

    tab.classList.add('selected');
    
    
    
    // const orderData = document.getElementsByClassName('bookings-wrapper');
    const orderData = document.getElementsByClassName('booking');
    for(i=0; i<orderData.length; i++) orderData[i].classList.add('hidden'); 
    
    const contentElems = document.getElementsByClassName(`booking-${contentTab}`)
    for(i=0; i<contentElems.length; i++) contentElems[i].classList.remove('hidden');
    
}
changeTab(document.getElementsByClassName('tab-title')[0], 'completed')

function payNow(orderid) {
    window.location.href = `/booking/pay?id=${orderid}`
}