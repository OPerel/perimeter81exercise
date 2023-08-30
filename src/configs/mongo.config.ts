import {MongoClient} from 'mongodb';

class MongoConfig {
  private client

  constructor() {
    // env for connection string
    this.client = new MongoClient('mongodb://localhost:27017/pet_store')

    this.client.connect().then(() => {
      this.client.db('pet_store').command({ping: 1})
        .then((res) => console.log('connection to mongo successful: ', res))
    })
      .catch(err => console.log('failed connecting to mongo: ', err))
  }

  public get mongoConnection() {
    return this.client.db('pet_store')
  }

  public async closeConnection() {
    await this.client.close()
  }
}

// const mongo = new MongoConfig()
export default MongoConfig;