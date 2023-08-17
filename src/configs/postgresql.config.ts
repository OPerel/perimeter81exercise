import {Client} from 'pg';

class PostgresqlConfig {
  private client: Client;

  constructor() {
    this.client = new Client({
      // should use env files for connection config
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

const postgresqlConfig = new PostgresqlConfig();
export default postgresqlConfig;
