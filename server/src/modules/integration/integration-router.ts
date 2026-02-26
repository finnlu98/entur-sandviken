import BaseRouter from '../common/base-router';
import IntegrationService from './integration-service';

export default class IntegrationRouter extends BaseRouter {
  private integrationService: IntegrationService;
  constructor() {
    super('/integration');
    this.integrationService = new IntegrationService();
    this.setRoute();
  }

  setRoute(): void {
    this.route.get(this.subRoute, async (req, res) => {
      const { provider } = req.query;

      if (typeof provider !== 'string') {
        return res.status(400).send({ error: 'Provider is required' });
      }

      const integration = this.integrationService.getIntegration(req.session, provider);
      res.send({ integration });
    });

    this.route.post(this.subRoute, async (req, res) => {
      const { provider, key, endpoint } = req.body;
      const result = await this.integrationService.setIntegration(
        req.session,
        provider,
        key,
        endpoint
      );
      res.send({ success: result });
    });
  }
}
