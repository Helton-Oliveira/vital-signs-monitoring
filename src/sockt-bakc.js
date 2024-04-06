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
    });

    socket.on('obtain_patient', async({ namePatient }, returnText) => {
        const patient = await patientServices.getOne({name: namePatient});

        returnText(patient.complaint);
    })

    socket.on('show_vital_signs', async({ namePatient, agePatient }) => {
        socket.join(namePatient);

        setInterval(() => {
            io.to(namePatient).emit('generates_data', generator(agePatient));
        }, 10000);
    });
    
    socket.on('edit_medical_record', async (updatedText) => {
       const textUpdated = await patientServices.updateMeidcalRecord(updatedText);

       if(textUpdated.modifiedCount) {
           socket.to(updatedText.name).emit('edit_text_area', updatedText.text);
       }
    })
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