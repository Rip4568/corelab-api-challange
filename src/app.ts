import { server } from './server';
//import * as swaggerDocument from './swagger.json';
const app = server;
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export {
  app,
  port,
}