import io from "../server.js";
import Patient from "./service/patient.js";
import Doctor from './service/Doctor.js';
import VitalSigns from "./utils/VitalSignsGenerator.js";

const doctorServices = new Doctor;
const patientServices = new Patient;

io.on('connection', (socket) => {
    socket.on('doctor_login', async (data, returnLogin) => {
        const doctor = await doctorServices.getOne(data);

        doctor ? returnLogin(doctor) : console.log('erro');
    });

    socket.on('get_list_of_patients', async (response) => {
        const patients = await patientServices.getAll();

        return response(patients);
    })

    socket.on('show_vital_signs', ({ namePatient, agePatient }) => {
        socket.join(namePatient);

        setInterval(() => {
            io.emit('generates_data', generator(agePatient));
        }, 1000);
    });

});

function generator(age) { 
    let signals = {
        bpm: VitalSigns.heartBeatGenegator(age),
        fr: VitalSigns.respiratoryRateGenerator(),
        pa: VitalSigns.bloodPressureGenerator(),
        temp: VitalSigns.temperatureGenerate(),
        sat: VitalSigns.saturationGenerator(),
    }

    return signals;
}