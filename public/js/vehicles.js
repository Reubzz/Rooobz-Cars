function search(params) {
    let input = document.getElementById('searchInput').value
    input=input.toLowerCase();
    let cards = document.getElementsByClassName('card');
    // let hr = document.getElementByClassName('lb-divider');
      
    for (i = 0; i < cards.length; i++) { 
        if (!cards[i].innerHTML.toLowerCase().includes(input)) {
            cards[i].style.display="none";
            if(cards[i].id != 0)
                document.getElementById(`divider-${cards[i].id}`).style.display="none"
            
            // hr[i].style.display="none";
        }
        else {
            cards[i].style.display="";
            if(cards[i].id != 0)
                document.getElementById(`divider-${cards[i].id}`).style.display=""
            // hr[i].style.display="";

        }
    }
}

function sortBy() {
    let sortInput = document.getElementById('sort').value
    let currentURL = document.URL;
    if (sortInput == 'none') {
        window.location.replace(currentURL.split('?')[0])
    }
    if (currentURL.includes('?sort=')) {
        return window.location.replace(currentURL.split('?')[0]+'?sort='+sortInput)
    }
    return window.location.replace(document.URL+'?sort='+document.getElementById('sort').value)
}