import {Router} from 'express';
import service from '../service/dogs.service';

const dogsRouter = Router();

dogsRouter.get('/', async (_, res) => {
  const users = await service.get({});
  res.json(users);
});

dogsRouter.post('/', ((req, res) => {
  const {name, age, color} = req.body;

  // should verify all pet params
  // probably using schema validation tool like joi
  if (!name) {
    res.status(400).json('Dog name required')
  }

  const result = service.create({name, age, color});
  res.status(201).json({created: result})
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
    res.status(500).send()
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