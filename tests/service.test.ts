import postgresqlConfig from '../src/configs/postgresql.config';
import mongoConfig from '../src/configs/mongo.config';
import service from '../src/service/dogs.service';
import {FilterParam} from '../src/interfaces';

afterAll(() => {
  postgresqlConfig.DbConnection.end();
  mongoConfig.closeConnection();
})

describe('Service', () => {
  test('get all dogs', async () => {
    const dogs = await service.get([]);
    expect(dogs).toEqual([
      {
        "name": "tom",
        "age": "3.5",
        "color": "white",
      }
    ]);
  });

  test('get all dogs above age 3', async () => {
    const dogs = await service.get([{
      column: 'age',
      op: 'gt',
      value: '3',
    } as FilterParam]);

    expect(dogs).toEqual([
      {
        "name": "tom",
        "age": "3.5",
        "color": "white",
      }
    ]);
  });

  test('get all dogs above age 4', async () => {
    const dogs = await service.get([{
      column: 'age',
      op: 'gt',
      value: '4',
    } as FilterParam]);

    expect(dogs).toEqual([]);
  });
});
