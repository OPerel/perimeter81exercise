export interface Pet {
  id: string;
  type: string;
}

export interface Dog {
  name: string;
  age: number;
  color: string;
}

// api
export interface IService<T> {
  da: IDataAccess<T>

  create(params: T): Promise<void>;

  delete(id: string): Promise<void>;

  get(params: Partial<T>): Promise<T[]>;

  update(id: string, params: T): Promise<void>;
}

export interface IDataAccess<T> {
  create(params: T): Promise<void>;

  delete(id: string): Promise<void>;

  get(params: Partial<T>): Promise<T[]>;

  update(id: string, params: T): Promise<void>;
}

