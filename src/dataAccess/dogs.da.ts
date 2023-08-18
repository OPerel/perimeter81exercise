import * as crypto from 'crypto';
import {IDataAccess, Dog, FilterParam, OrderParam} from '../interfaces';
import {useDb} from '../configs/db';
import {Client} from 'pg';
import postgresqlConfig from '../configs/postgresql.config';
import {DogsDto} from '../dtos/dogs.dto';
import mongoConfig from '../configs/mongo.config';
import {Collection, Db} from 'mongodb';
import {buildSqlQuery} from './sqlQueryBuilder';
import {buildMongoFilters, buildMongoOrderClause} from './mongoQuerybuilder';

// should sync dbs!!

// with the current implementation every pet will have to implement two data access classes, which is not ideal at all
// one solution I can think of is to have a factory for each DB type that will return the data access class
// with generated queries appropriate to the pet

// also, some sort of query generation is needed if we want to filter results in the DBs

class DogsSqlDataAccess implements IDataAccess<Dog> {
  db: Client;

  constructor() {
    this.db = postgresqlConfig.DbConnection
  }

  async get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<Dog[]> {
    try {
      const result = await this.db.query<Dog>(buildSqlQuery(filterParams, orderParam));
      return DogsDto({type: 'sql', sqlDog: result});
    } catch (e) {
      throw new Error((e as Error).message);
    }

  }

  async create(params: Dog) {
    const id = crypto.randomUUID();
    const {name, age, color} = params
    try {
      await this.db.query(
        `INSERT INTO dogs(id, name, age, color) VALUES($1, $2, $3, $4)`,
        [id, name, age, color]
      )
    } catch (e) {
      console.log('Error creating user: ', e)
      throw new Error((e as Error).message)
    }
  }

  async update(id: string, params: Dog) {
    const {name, age, color} = params;
    try {
      await this.db.query(
        `UPDATE dogs SET name = $1, age = $2, color = $3 WHERE id = $4;`,
        [name, age, color, id]
      )
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async delete(id: string) {
    try {
      await this.db.query(
        `DELETE FROM dogs WHERE id = $1`,
        [id]
      )
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }
}

class DogsMongoDataAccess implements IDataAccess<Dog> {
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

      return DogsDto({type: 'mongo', mongoDog: result})
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

function DogsDaFactory(): DogsSqlDataAccess | DogsMongoDataAccess {
  if (useDb === 'sql') {
    return new DogsSqlDataAccess()
  }

  return new DogsMongoDataAccess();
}

export default DogsDaFactory();
