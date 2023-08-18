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

  get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<T[]>;

  update(id: string, params: T): Promise<void>;
}

export interface IDataAccess<T> {
  db: Db | Client

  create(params: T): Promise<void>;

  delete(id: string): Promise<void>;

  get(filterParams: FilterParam[], orderParam: OrderParam | null): Promise<T[]>;

  update(id: string, params: T): Promise<void>;
}

export enum Op {
  Equal = 'eq',
  NotEqual = 'neq',
  GreaterThan = 'gt',
  LessThan = 'lt'
}

export type OpType = Op.Equal | Op.NotEqual | Op.GreaterThan | Op.LessThan

export interface FilterParam {
  column: string;
  op: OpType;
  value: string;
}

export interface OrderParam {
  column: string;
  order: 'ASC' | 'DESC'
}
