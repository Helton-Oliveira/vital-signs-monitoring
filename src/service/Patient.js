import { patients } from "../../database/dbConnect.js";
import Service from "./Service.js";

class Patient extends Service{
    constructor() {
        super(patients)
    }

    updateMeidcalRecord = async(data) => {
        const updateText = await patients.updateOne({
            name: data.name
        }, {
            $set: { complaint: data.text}
        })
        return updateText;
    }
};

export default Patient;