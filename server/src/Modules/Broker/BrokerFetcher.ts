import type { Session, SessionData } from "express-session";
import BaseFetcherEndpoint from "../Common/BaseFetcherEndpoint";
import IntegrationService from "../Integration/IntegrationService";

export default class BrokerFetcher extends BaseFetcherEndpoint {
  private integrationService: IntegrationService;

  constructor(TTL: number) {
    super(TTL);
    this.integrationService = new IntegrationService();
  }

  formatHeader(
    session: Session & Partial<SessionData>,
    integration: string,
    internalIntegration: boolean = false,
  ): any {
    if (!internalIntegration) {
      const auth = this.integrationService.getIntegration(session, integration);
      if (!auth) return null;
      return { authorization: auth };
    }

    const authorization = this.integrationService.getInternalIntegration(integration);
    return authorization;
  }
}
