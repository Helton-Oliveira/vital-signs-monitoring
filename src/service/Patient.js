import { patients } from "../../database/dbConnect.js";
import Service from "./Service.js";

class Patient extends Service{
    constructor() {
        super(patients)
    }
};

export default Patient;