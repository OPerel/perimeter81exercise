import {useDb} from '../../configs/db';
import {DogsSqlDataAccess} from './DogsSqlDataAccess';
import {DogsMongoDataAccess} from './DogsMongoDataAccess';

// should sync dbs!!

// with the current implementation every pet will have to implement two data access classes, which is not ideal at all
// one solution I can think of is to have a factory for each DB type that will return the data access class
// with generated queries appropriate to the pet


function DogsDaFactory(): DogsSqlDataAccess | DogsMongoDataAccess {
  if (useDb === 'sql') {
    return new DogsSqlDataAccess()
  }

  return new DogsMongoDataAccess();
}

export default DogsDaFactory();
