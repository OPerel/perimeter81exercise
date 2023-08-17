import ExpressConfig from './configs/express.config';

const app = ExpressConfig();

app.listen(5000, () => {
  console.log('listening on port 5000');
});
