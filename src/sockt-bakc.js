import io from "../server.js";
import Patient from "./service/patient.js";

io.on('connect', (socket) => {
    io.on('getPatient', async (returnPatient) => {
        const patients = await Patient.getAll();

        returnPatient(patients);
    })
})