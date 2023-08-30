import {FilterParam, IDataAccess, OrderParam, Pet} from '../../interfaces';
import {Client} from 'pg';
import postgresqlConfig from '../../configs/postgresql.config';
import {buildSqlQuery, createColumnsByPet} from '../sqlQueryBuilder';
// import {normalizeDog} from './normalizeDog';
import crypto from 'crypto';

export class SqlDataAccess<T extends Pet> implements IDataAccess<T> {
  db: Client;
  type: string

  constructor(type: string) {
    this.db = postgresqlConfig.DbConnection;
    this.type = type;
  }

  async get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<T[]> {
    try {
      const result = await this.db.query<T>(buildSqlQuery(this.type, filterParams, orderParam));
      // return normalizeDog({dbType: 'sql', sql: result});
      return result.rows;
    } catch (e) {
      throw new Error((e as Error).message);
    }

  }

  async create(params: T) {
    const id = crypto.randomUUID();
    try {
      const columns = createColumnsByPet(this.type);
      const values = columns.map((_, idx) => `$${idx + 4}`)
      const query = `INSERT INTO ${this.type}(id, name, age, ${[...columns]}) VALUES($1, $2, $3, ${[...values]})`
      await this.db.query(
        query,
        [id, ...Object.values(params)]
      )
    } catch (e) {
      console.log('Error creating user: ', e)
      throw new Error((e as Error).message)
    }
  }

  async update(id: string, params: T) {
    try {
      await this.db.query(
        `UPDATE ${this.type} SET name = $1, age = $2, color = $3 WHERE id = $4;`,
        [id, ...Object.values(params)]
      )
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  async delete(id: string) {
    try {
      await this.db.query(
        `DELETE FROM ${this.type} WHERE id = $1`,
        [id]
      )
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }
}