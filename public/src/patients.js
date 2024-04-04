const socket = io();
const divList = document.getElementById('patient_list');

function editList(data) {
    divList.innerHTML +=  ` 
        <a href="vitalSigns.html?name="${data.name}" class="patient_name" id="patient-name">${data.name}</a>
    `
};

const urlActual = window.document.URL.toString()

if(urlActual.includes('/patients.html')) {
    
    socket.emit('get_list_of_patients', (response) => {
        response.forEach(element => {
            editList(element); 
        });
    });
}