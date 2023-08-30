import postgresqlConfig from '../src/configs/postgresql.config';
import mongoConfig from '../src/configs/mongo.config';
import service from '../src/service/pets.service';
import {FilterParam} from '../src/interfaces';

afterAll(() => {
  postgresqlConfig.DbConnection.end();
  mongoConfig.closeConnection();
})

describe('Service', () => {
  test('get all pets', async () => {
    const dogs = await service.get([], null);
    expect(dogs).toEqual([
      {
        "name": "tom",
        "age": "3.5",
        "color": "white",
      },
      {
        "age": "5",
        "color": "white",
        "name": "pete",
      }
    ]);
  });

  test('get all pets above age 4', async () => {
    const dogs = await service.get([{
      column: 'age',
      op: 'gt',
      value: '4',
    } as FilterParam], null);

    expect(dogs).toEqual([
      {
        "age": "5",
        "color": "white",
        "name": "pete",
      }
    ]);
  });
});
