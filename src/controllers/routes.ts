import {Router} from 'express';
import dogsRouter from './dogs.controllers';

const routes = Router()

routes.use('/dogs', dogsRouter)

export default routes;