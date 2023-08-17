import DbConfig from '../configs/db.config';

export abstract class DataAccess {
  db: any;

  constructor() {
    this.db = DbConfig.DbConnection;
  }
}