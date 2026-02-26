import { Router, type Application, type Request, type Response } from 'express';
import BrokerRouter from '../modules/broker/broker-router';
import StockRouter from '../modules/stock/stock-router';
import { HomeActionsRouter } from '../modules/home-actions/home-actions-router';
import { UserRouter } from '../modules/user/user-router';
import AuthorizationRouter from '../modules/authorization/authorization-router';
import HomeRouter from '../modules/home/home-router';
import IntegrationRouter from '../modules/integration/integration-router';

export class Routes {
  app: Application;
  router: Router;

  constructor(app: Application) {
    this.app = app;
    this.router = Router();
    this.InitializeBaseEndpoint();
    this.RegisterRoutes();
  }

  InitializeBaseEndpoint() {
    this.router.get('', async (req: Request, res: Response) => {
      res.send('Backened server for Heimr dashboard. Lets get building!👷🏼‍♂️');
    });
  }

  RegisterRoutes() {
    const broker = new BrokerRouter();
    const stock = new StockRouter();
    const homeActions = new HomeActionsRouter();
    const user = new UserRouter();
    const auth = new AuthorizationRouter();
    const home = new HomeRouter();
    const integration = new IntegrationRouter();

    this.app.use('/', this.router);
    this.app.use('/api', broker.route);
    this.app.use('/api', stock.route);
    this.app.use('/api', homeActions.route);
    this.app.use('/api', user.route);
    this.app.use('/api', auth.route);
    this.app.use('/api', home.route);
    this.app.use('/api', integration.route);
  }
}
