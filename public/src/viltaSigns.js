const socket = io();
const divSignals = document.querySelectorAll('#vital_card_container');

const params = new URLSearchParams(window.document.location.search);
const nameUser = params.get('name');
const ageUser = params.get('age')

const user = {
    nameUser,
    ageUser
}

const urlActual = window.document.URL.toString()

if (urlActual.includes('/vitalSigns.html')) {

    socket.emit('show_vital_signs', user);

    socket.on('generates_data', (signals) => {
        showingVitalSigns(signals);
    })
}



function showingVitalSigns(event) {
    const obj = Object.keys(event);
    const values = Object.values(event);

    divSignals.forEach((element, i) => {
            element.innerHTML = `
               <h3 class="vital_card_title">${obj[i].toUpperCase()}</h3> 
               <span class="vital_card_numbers">${values[i]}</span>
           `
    })
}



