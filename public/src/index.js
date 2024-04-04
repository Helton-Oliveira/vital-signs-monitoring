const socket = io();

const userEmail = document.getElementById('email');
const userCRM = document.getElementById('crm');
const form = document.getElementById('form_login');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = userEmail.value;
    const CRM = userCRM.value;

    const data = {
        name,
        CRM
    }
    socket.emit('doctor_login', data, (callback) => {
        callback? window.location.href= '/patients.html' : console.log('erro');
    });

})