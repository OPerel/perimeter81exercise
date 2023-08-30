import {FilterParam, IDataAccess, OrderParam, Pet} from '../../interfaces';
import {Collection, Db} from 'mongodb';
import MongoConfig from '../../configs/mongo.config';
import {buildMongoFilters, buildMongoOrderClause} from '../mongoQuerybuilder';
// import {normalizeDog} from './normalizeDog';
import crypto from 'crypto';

export class PetsMongoDataAccess<T extends Pet> implements IDataAccess<T> {
  db: Db;
  collection: Collection;
  type: string

  constructor(type: string) {
    this.db = new MongoConfig().mongoConnection;
    this.collection = this.db.collection('pets')
    this.type = type
  }

  async get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<T[]> {
    try {
      const filters = buildMongoFilters(filterParams)
      let result = await this.collection.find(filters);

      if (orderParam !== null) {
        result.sort(buildMongoOrderClause(orderParam))
      }

      // return normalizeDog({dbType: 'mongo', mongo: result})
      return await result.toArray();
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async create(params: T) {
    const id = crypto.randomUUID();
    try {
      await this.collection.insertOne({...params, id})
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async update(id: string, params: T) {
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