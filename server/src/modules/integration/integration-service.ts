import type { Session, SessionData } from 'express-session';
import { encrypt, decrypt } from '../../lib/encryption';
import BaseFetcherEndpoint from '../common/base-fetcher-endpoint';

declare module 'express-session' {
  interface SessionData {
    integrations?: { [provider: string]: string };
  }
}

export default class IntegrationService {
  private readonly testIntegration: BaseFetcherEndpoint;

  constructor() {
    this.testIntegration = new BaseFetcherEndpoint(0);
  }

  async setIntegration(
    session: Session & Partial<SessionData>,
    provider: string,
    key: string,
    endpoint: string
  ): Promise<boolean> {
    if (provider && key) {
      this.testIntegration.setEndpoint(endpoint);
      this.testIntegration.setHeader({ authorization: key });

      try {
        await this.testIntegration.getData(`test_${key}`);
      } catch {
        console.error('Failed to validate integration:');
        return false;
      }

      if (!session.integrations) {
        session.integrations = {};
      }
      session.integrations[provider] = encrypt(key);
      return true;
    }

    return false;
  }

  getIntegration(session: Session & Partial<SessionData>, provider: string): string | null {
    const encryptedKey = session.integrations?.[provider];
    return encryptedKey ? decrypt(encryptedKey) : null;
  }

  getInternalIntegration(provider: string): any | null {
    if (provider === 'yr') {
      return { apikey: process.env.YRAPI_KEY || null };
    }

    return null;
  }
}
