const socket = io();
const divSignals = document.querySelectorAll('#vital_card_container');
const textArea = document.getElementById('history_patient');

const params = new URLSearchParams(window.document.location.search);
const namePatient = params.get('name');
const agePatient = params.get('age')

const user = {
    namePatient,
    agePatient
}

console.log(user);

socket.emit('obtain_patient', user, (text) => {
    updateText(text);
});

socket.emit('show_vital_signs', user);

socket.on('generates_data', (signals) => {
    showingVitalSigns(signals);
})

textArea.addEventListener('keyup', () => {
    const updatedText = {
        name: namePatient,
        text: textArea.value,
    };
    socket.emit('edit_medical_record', updatedText);
})

socket.on('edit_text_area', (text) => {
    console.log(text)
    updateText(text);
})




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

function updateText(text) {
    textArea.value = text
}



