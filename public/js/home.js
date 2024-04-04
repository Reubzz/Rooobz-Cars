
$('#car-type').change(function() {
    let selectedCategory = $('#car-type').val().toLowerCase();  
    if(selectedCategory != "") {
        //Removing current option
        $('#car').find('option').remove(); 

        cars.forEach(car => {
            if (car.type.toLowerCase() == selectedCategory){
                $('#car').append($("<option></option>").attr({value: car.name, "data-car-url": `${car.brand}/${car.name}`}).text(car.name));
            }
        });
    } else{
        // If nothing is selected then it will remove previous options
        // and add all available cars
        $('#car').empty()
        $('#car').append($("<option></option>").attr({value: "", class: "placeholder-text"}).text("Select a Car"));
        cars.forEach(car => {
            $('#car').append($("<option></option>").attr({value: car.name, "data-car-url": `${car.brand}/${car.name}`}).text(car.name));
        });
    }
});

$('#book-now-form').on('submit', function(e){
    e.preventDefault(); 
    let formData = new FormData($(this)[0]);
    cars.forEach(car => {
        if (car.name == formData.get('car')) {
            window.location.href = `/vehicles/${car.brand}/${car.name}`
        }
    });
})