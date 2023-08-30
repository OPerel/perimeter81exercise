import {Router} from 'express';
import PetsService from '../service/pets.service';
import {Dog, Bird, FilterParam, OrderParam} from '../interfaces';

const petsRouter = Router();

/**
 * all routes need a better way for validating inputs
 * and better error handling
 */


const serviceFactory = (type: string) => {
  switch (type) {
    case 'birds': {
      return new PetsService<Bird>(type)
    }
    default: {
      return new PetsService<Dog>(type)
    }
  }
}


petsRouter.post('/search/:type', async (req, res) => {

  // should validate params
  const {type} = req.params;


  const service = serviceFactory(type)

  const filterParams: FilterParam[] = req.body.filters;

  // only one order param is supported at the moment...
  const orderParam: OrderParam | null = req.body.order || null;

  try {
    const users = await service.get(filterParams, orderParam);
    res.json(users);
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
});

petsRouter.post('/create/:type', ((req, res) => {
  const {fields} = req.body;
  const {type} = req.params
  const service = serviceFactory(type)

  // should validate all pet params
  // probably using schema validation tool like joi
  if (!fields) {
    res.status(400).json('pet details required')
  }

  try {
    const result = service.create(fields);
    res.status(201).json({created: result})
  } catch (e) {
    res.status(500).json(e)
  }
}))

petsRouter.put('/:type', (async (req, res) => {
  const {fields, id} = req.body;
  const {type} = req.params
  const service = serviceFactory(type)

  if (!fields || !id) {
    res.status(400).json('All params are required')
  }

  try {
    await service.update(id, fields);
    res.status(200).send()
  } catch (e) {
    res.status(500).json(e)
  }
}))

petsRouter.delete('/:type', (async (req, res) => {
  const {id} = req.query
  const {type} = req.params
  const service = serviceFactory(type)

  if (!id) {
    res.status(400).json('Dog id required')
  }

  try {
    await service.delete(id as string);
    res.status(200).send()
  } catch (e) {
    res.status(500).json(e);
  }
}))

export default petsRouter;