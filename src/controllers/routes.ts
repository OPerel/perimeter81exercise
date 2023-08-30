import {Router} from 'express';
import petsRouter from './pets.controllers';

const routes = Router()

routes.use('/pets', petsRouter)

export default routes;