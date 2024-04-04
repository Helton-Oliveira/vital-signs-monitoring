class Service {
    constructor(entity){
        this.entity = entity
    }

    getAll = () => {
      const data = this.entity.find({}).toArray();
      
      return data;
    }

    getOne = async (data) => {
      const user = await this.entity.findOne({...data});

      return user;
    }
}

export default Service;