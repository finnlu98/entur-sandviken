import BaseRouter from '../common/base-router';
import type { Request, Response } from 'express';
import { HomeActionsFetcher } from './home-actions-fetcher';

export class HomeActionsRouter extends BaseRouter {
  fetcher: HomeActionsFetcher;
  constructor() {
    super('/homeactions');
    this.fetcher = new HomeActionsFetcher(0); // No caching
    this.setRoute();
  }

  setRoute(): void {
    this.route.post(this.subRoute, async (req: Request, res: Response) => {
      const headers = req.headers;
      const { endpoint, selectedOption } = req.body;
      this.fetcher.setEndpoint(endpoint);
      this.fetcher.setBody(selectedOption);

      const authorization = headers['homeauthorization'];
      if (authorization) this.fetcher.setHeader({ authorization });

      const postRes = await this.fetcher.PostData();

      res.send(postRes.data);
    });
  }
}
