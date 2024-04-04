import Service from "./Service.js";
import { doctors } from "../../database/dbConnect.js";

class Doctor extends Service{
    constructor() {
        super(doctors);
    };

};

export default Doctor;