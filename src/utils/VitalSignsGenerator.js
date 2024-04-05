export default class VitalSigns {

    static heartBeatGenegator = (age) => {
        if(age >= 13) {
            return Math.floor(Math.random() * (100 - 60) + 60);
        } 
        
        return Math.floor(Math.random() * (118 - 75) + 75); 
    }

    static respiratoryRateGenerator = () => {
        return Math.floor(Math.random() * (20 - 12) + 12);
    }

    static temperatureGenerate = () => {
        const temp = (Math.random() * (37 - 36) + 36).toFixed(1);

        return `${temp}°C`
    }

    static bloodPressureGenerator = () => {
        const systole =  Math.floor(Math.random() * (129 - 90) + 90);
        const diastole = Math.floor(Math.random() * (84 - 60) + 60);

        return `${systole} x ${diastole}`
    }

    static saturationGenerator = () => {
        const o2 = Math.floor(Math.random() * (100 - 97) + 97);

        return `${o2}%` ;
    }

}