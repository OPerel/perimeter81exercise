import DataAccess from '../dataAccess/pets';
import {IDataAccess, IService, FilterParam, OrderParam, Pet} from '../interfaces';

class PetsService<T extends Pet> implements IService<T> {
  da: IDataAccess<T>;
  type: string

  constructor(type: string) {
    this.type = type;
    this.da = new DataAccess<T>(this.type);
  }

  async get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<T[]> {
    return await this.da.get(filterParams, orderParam);
  }


  async create(params: T) {
    return await this.da.create(params)
  }

  async update(id: string, params: T) {
    return await this.da.update(id, params)
  }

  async delete(id: string) {
    return await this.da.delete(id)
  }
}

// const service = new PetsService()
export default PetsService;
