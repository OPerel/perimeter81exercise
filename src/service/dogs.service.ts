import da from '../dataAccess/dogs.da';
import {IDataAccess, Dog, IService} from '../interfaces';

class DogsService implements IService<Dog> {
  da: IDataAccess<Dog>;

  constructor() {
    this.da = da
  }

  async get(params: Partial<Dog>): Promise<Dog[]> {
    return await da.get(params);
  }


  async create(params: Dog) {
    return await da.create(params)
  }

  async update(id: string, params: Dog) {
    return await this.da.update(id, params)
  }

  async delete(id: string) {
    return await this.da.delete(id)
  }
}

const service = new DogsService()
export default service;