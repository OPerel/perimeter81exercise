import * as crypto from 'crypto';
import {IDataAccess, Dog} from '../interfaces';
import {DataAccess} from './DataAccess';

class DogsDataAccess extends DataAccess implements IDataAccess<Dog> {

  async get(params: Partial<Dog>): Promise<Dog[]> {
    console.log(params)
    try {
      const result = await this.db.query(`
        select * from dogs;
      `);
      return result.rows;
    } catch (e) {
      throw new Error((e as Error).message)
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

const da = new DogsDataAccess();
export default da;
