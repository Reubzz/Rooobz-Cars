function changeTab(tab, contentClassName = null, dropdownparentelement = null) {
    const allTabs = document.getElementsByClassName('clickable-element');
    for (i=0; i<allTabs.length; i++) allTabs[i].classList.remove('selected')
    tab.classList.add('selected');
    
    const allData = document.getElementsByClassName('data-card');
    for(i=0; i<allData.length; i++) allData[i].classList.add('hidden'); 

    const contentClass = contentClassName || `${tab.dataset.category}-${tab.dataset.type}`
    const content = document.getElementsByClassName(contentClass)
    for(i=0; i<content.length; i++) content[i].classList.remove('hidden');

    const addDropdown = document.getElementsByClassName('menu-dropdown')
    for(i=0; i<addDropdown.length; i++) addDropdown[i].classList.add('hidden'); 

    const dropDownParentElement = dropdownparentelement || tab.dataset.dropdownparent
    if(dropDownParentElement) document.getElementById(dropDownParentElement).classList.remove('hidden')
}

function openDropDown(element) {
    element.classList.toggle('selected')
    document.getElementById(element.dataset.dropdown).classList.toggle('hidden')
}

const openTab = new URLSearchParams(window.location.search).get('tab');

if(openTab) changeTab(document.getElementById(`${openTab}`))
else changeTab(document.getElementById("booking-active-tab"))


// ! API Calls for Buttons Below

/**
 * @function callAPI()
 * 
 * @param {String} id the id that is sent to the backend
 * @param {Element} element the html element that was clicked @returns the button element
 * @param {String} apiName The Api endpoint that is ment to be used
 * @param {String} method the method used to send the request (POST DELETE PUT GET)
 * @param {Boolean} deleteElement Whethere the whole card should be deleted from the DOM or not
 * @param {String} classAdd This class will be added to the Card 
 * @param {String} classRemove This class will be remove from the Card
 * 
 * @returns {Boolean} Sucess or Failure in Json Format
 */

async function callAPI( 
    id, 
    element, 
    apiName, 
    method = 'POST', 
    deleteElement = false,
    ) {
        
        const elementCard = element.parentElement.parentElement
        const res = await fetch(`/api/${apiName}`, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        const data = await res.json();
        if (data.status.code == 200 || data.error.code == 100) {
            if(deleteElement) return elementCard.remove()
            else return window.location.replace(`${window.location.pathname}?tab=${elementCard.dataset.cardtype}-tab`) 
        }
        
}