import express, {Application} from 'express';
import routes from '../controllers/routes';

const ExpressConfig = (): Application => {
  const app = express();
  app.use(express.json())
  app.use(routes);
  return app;
};

export default ExpressConfig;
