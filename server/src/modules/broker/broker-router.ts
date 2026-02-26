import type { Request, Response } from 'express';
import BaseRouter from '../common/base-router';
import BrokerFetcher from './broker-fetcher';

export default class BrokerRouter extends BaseRouter {
  fetcher: BrokerFetcher;

  constructor() {
    super('/broker');
    this.fetcher = new BrokerFetcher(60 * 60_000);
    this.setRoute();
  }

  setRoute(): void {
    this.route.post(this.subRoute, async (req: Request, res: Response) => {
      const sessionId = req.session.id;
      const { endpoint, integration, internalIntegration } = req.body;
      if (typeof endpoint !== 'string') {
        return res.status(400).send({ error: 'Endpoint is required' });
      }

      let auth = null;
      if (integration && typeof integration === 'string') {
        auth = this.fetcher.formatHeader(req.session, integration, internalIntegration);
        if (auth) this.fetcher.setHeader(auth);
        else
          return res.status(401).send({
            error: 'Required authentication does not exist for the requested integration',
          });
      }
      this.fetcher.setEndpoint(endpoint);

      const cacheKey =
        `${sessionId}_${endpoint}` +
        (integration ? `_${integration}` : '') +
        (auth ? `_${auth}` : '');

      res.send(await this.fetcher.getData(cacheKey));
    });
  }
}
