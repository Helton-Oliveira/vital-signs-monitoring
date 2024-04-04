import io from "../server.js";
import Patient from "./service/patient.js";
import Doctor from './service/Doctor.js';

const doctorServices = new Doctor;
const patientServices = new Patient;

io.on('connection', (socket) => {
    socket.on('doctor_login', async(data, returnLogin) => {
        const doctor = await doctorServices.getOne(data);

        doctor? returnLogin(doctor) : console.log('erro');
    });

    socket.on('get_list_of_patients', async(response) => {
        const patients = await patientServices.getAll();

        return response(patients);
    })

})