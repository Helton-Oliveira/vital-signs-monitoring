class Service {
    constructor(entity){
        this.entity = entity
    }

    static getAll = () => {
      const data =  this.entity.find({}).toArray();

      return data;
    }
}

export default Service;