

const popmsg = document.querySelector('.popmsg');
const addGarmentButton = document.querySelector('.addGarmentButton');
const hideAddGarmentButton = document.querySelector('.hideAddGarmentButton');
const addClothes = document.querySelector('.add.clothes');
const addClothesButton = document.querySelector('.add.button');

function showMessage(value) {
    popmsg.innerHTML = value;
     message.classList.toggle('hidden');

    setTimeout(() => {
      message.innerHTML = '';
      message.classList.toggle('hidden');
     }, 3000);
}

function clothesScreen() {
    addClothes.classList.toggle('hidden');
     addGarmetButtonSection.classList.toggle('hidden');
}

hideAddGarmentButton.addEventListener('click', function (evt) {
    toggleclothesScreen()
});

const fieldManager = FieldManager({
    'description': '',
    'img': '',
    'season': '',
    'gender': '',
    'price': 0.00
});

addGarmentButton.addEventListener('click', function (evt) {
    
    // fields on the screen
    const fields = fieldManager.getValues();

    axios
        .post('/api/garments', fields)
        .then(result => {
            if (result.data.status == 'error') {
                showMessage(result.data.popmsg);
            } else {
                clothesScreen();
                // show success message from API
                showMessage(result.data.message);
                fieldManager.clear();
// show all the data
filterData();
}
})
.catch(err => {
showMessage(err.stack)
});
});

addClothes.addEventListener('click', function (evt) {
evt.preventDefault();
toggleclothesScreen()
});
function myFunction() {
// Get the snackbar DIV
var x = document.getElementById("snackbar");

// Add the "show" class to DIV
x.className = "show";

// After 3 seconds, remove the show class from DIV
setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

