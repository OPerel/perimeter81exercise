import {Client} from 'pg';

class DbConfig {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'pet_store',
      user: 'postgres',
      password: 'mylocaldb',
    });
    this.client
      .connect()
      .then(() => console.log('connected to DB'))
      .catch((err) => console.log(err));
  }

  public get DbConnection() {
    return this.client;
  }
}

const db = new DbConfig();
export default db;
