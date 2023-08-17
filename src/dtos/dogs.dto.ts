import {QueryResult} from 'pg';
import {Dog} from '../interfaces';
import {EnhancedOmit, FindCursor, InferIdType} from 'mongodb';

type DbDogObject = {
  type: 'sql'
  sqlDog: QueryResult<Dog>
} | {
  type: 'mongo',
  mongoDog: FindCursor<EnhancedOmit<Dog, "_id"> & { _id: InferIdType<Dog> }>
}

export async function DogsDto(dogs: DbDogObject) {
  if (dogs.type === 'sql') {
    return dogs.sqlDog.rows.map((dog: Dog) => ({
      name: dog.name,
      age: dog.age,
      color: dog.color
    }))
  } else {
    const dogsData = await dogs.mongoDog.toArray()
    return dogsData.map((dog: Dog) => ({
      name: dog.name,
      age: dog.age,
      color: dog.color
    }))
  }
}
