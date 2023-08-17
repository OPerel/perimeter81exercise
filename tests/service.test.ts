import postgresqlConfig from '../src/configs/postgresql.config';
import mongoConfig from '../src/configs/mongo.config';
import {useDb} from '../src/configs/db';
import service from '../src/service/dogs.service';

afterAll(() => {
  if (useDb === 'sql') {
    postgresqlConfig.DbConnection.end();
  } else {
    mongoConfig.closeConnection();
  }
})

describe('Service', () => {
  test('get all dogs', async () => {
    const dogs = await service.get({});
    expect(dogs).toEqual([
      {
        "name": "tom",
        "age": "3.5",
        "color": "white",
      }
    ]);
  });
});
