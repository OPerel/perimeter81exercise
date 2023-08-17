import DbConfig from '../configs/db.config';
import {Client} from 'pg';

export abstract class DataAccess {
  db: Client;

  constructor() {
    this.db = DbConfig.DbConnection;
  }
}