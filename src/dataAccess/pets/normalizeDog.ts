import {QueryResult} from 'pg';
import {EnhancedOmit, FindCursor, InferIdType} from 'mongodb';
import {Pet} from '../../interfaces';

type DbDogObject<T> = {
  dbType: 'sql'
  sql: QueryResult<T>
} | {
  dbType: 'mongo',
  mongo: FindCursor<EnhancedOmit<T, "_id"> & { _id: InferIdType<T> }>
}

export async function normalizeDog<T extends Pet>(pets: DbDogObject<T>): Promise<T[]> {
  if (pets.dbType === 'sql') {
    return pets.sql.rows.map((pet: T) => ({
      // name: pet.name,
      // age: pet.age,
      // color: pet.color
      ...pet
    }))
  } else {
    const petsData = await pets.mongo.toArray()
    return petsData.map((pet: T) => ({
      // name: pet.name,
      // age: pet.age,
      // color: pet.color
      ...pet
    }))
  }
}
