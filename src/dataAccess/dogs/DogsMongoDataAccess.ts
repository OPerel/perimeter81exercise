import {Dog, FilterParam, IDataAccess, OrderParam} from '../../interfaces';
import {Collection, Db} from 'mongodb';
import mongoConfig from '../../configs/mongo.config';
import {buildMongoFilters, buildMongoOrderClause} from '../mongoQuerybuilder';
import {normalizeDog} from './normalizeDog';
import crypto from 'crypto';

export class DogsMongoDataAccess implements IDataAccess<Dog> {
  db: Db;
  collection: Collection<Dog>;

  constructor() {
    this.db = mongoConfig.mongoConnection;
    this.collection = this.db.collection<Dog>('dogs')
  }

  async get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<Dog[]> {
    try {
      const filters = buildMongoFilters(filterParams)
      let result = await this.collection.find(filters);

      if (orderParam !== null) {
        result.sort(buildMongoOrderClause(orderParam))
      }

      return normalizeDog({type: 'mongo', mongoDog: result})
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async create(params: Dog) {
    const id = crypto.randomUUID();
    try {
      await this.collection.insertOne({id, ...params})
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async update(id: string, params: Dog) {
    try {
      await this.collection.updateOne({id}, {$set: params})
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async delete(id: string) {
    try {
      await this.collection.deleteOne({id})
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }
}