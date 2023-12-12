import dotenv from 'dotenv';
import HttpServer from './infrastructure/http/HttpServer';
import ProductsController from './infrastructure/http/ProductsController';
import DatabaseConnection from './infrastructure/database/DatabaseConnection';

dotenv.config();

const httpServer = new HttpServer();

httpServer.register()
  .get('/', (req: any, res: any) => {
    res.send('Hello World!');
  });

const dbConnection = new DatabaseConnection();
new ProductsController(httpServer, dbConnection);

httpServer.listen();