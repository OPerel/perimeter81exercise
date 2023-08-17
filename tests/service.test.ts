import db from '../src/configs/db.config';
import service from '../src/service/dogs.service';

afterAll(() => {
  db.DbConnection.end();
})

describe('Service', () => {
  test('get all users', async () => {
    const users = await service.get({});
    expect(users).toEqual([
      {
        "id": "d8b2af93-8ca5-4346-9aa1-bdacda64e027",
        "name": "tom",
        "age": "3.5",
        "color": "white",
        "type": "dog"
      }
    ]);
  });
});
