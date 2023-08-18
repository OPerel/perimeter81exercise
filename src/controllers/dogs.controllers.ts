import {Router} from 'express';
import service from '../service/dogs.service';
import {FilterParam} from '../interfaces';

const dogsRouter = Router();

/**
 * all routes need a better way for validating inputs
 * and better error handling
 */

dogsRouter.post('/search', async (req, res) => {
  // should validate params
  const filterParams: FilterParam[] = req.body.filters;

  try {
    const users = await service.get(filterParams);
    res.json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

dogsRouter.post('/', ((req, res) => {
  const {name, age, color} = req.body;

  // should validate all pet params
  // probably using schema validation tool like joi
  if (!name) {
    res.status(400).json('Dog name required')
  }

  try {
    const result = service.create({name, age, color});
    res.status(201).json({created: result})
  } catch (e) {
    res.status(500).json(e)
  }
}))

dogsRouter.put('/', (async (req, res) => {
  const {name, age, color, id} = req.body;

  if (!name || !age || !color || !id) {
    res.status(400).json('All params are required')
  }

  try {
    await service.update(id, {name, age, color});
    res.status(200).send()
  } catch (e) {
    res.status(500).json(e)
  }
}))

dogsRouter.delete('/', (async (req, res) => {
  const {id} = req.query

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

export default dogsRouter;