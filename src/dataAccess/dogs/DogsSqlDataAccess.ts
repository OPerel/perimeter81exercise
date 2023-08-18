import {Dog, FilterParam, IDataAccess, OrderParam} from '../../interfaces';
import {Client} from 'pg';
import postgresqlConfig from '../../configs/postgresql.config';
import {buildSqlQuery} from '../sqlQueryBuilder';
import {normalizeDog} from './normalizeDog';
import crypto from 'crypto';

export class DogsSqlDataAccess implements IDataAccess<Dog> {
  db: Client;

  constructor() {
    this.db = postgresqlConfig.DbConnection
  }

  async get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<Dog[]> {
    try {
      const result = await this.db.query<Dog>(buildSqlQuery(filterParams, orderParam));
      return normalizeDog({type: 'sql', sqlDog: result});
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