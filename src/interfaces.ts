import {Db} from 'mongodb';
import {Client} from 'pg';

export interface Pet {
  id: string
}

export interface Dog {
  id?: string;
  name: string;
  age: number;
  color: string;
}

export interface IService<T> {
  da: IDataAccess<T>

  create(params: T): Promise<void>;

  delete(id: string): Promise<void>;

  get(params: Partial<T>): Promise<T[]>;

  update(id: string, params: T): Promise<void>;
}

export interface IDataAccess<T> {
  db: Db | Client

  create(params: T): Promise<void>;

  delete(id: string): Promise<void>;

  get(params: Partial<T>): Promise<T[]>;

  update(id: string, params: T): Promise<void>;
}

