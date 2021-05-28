import { registerClient } from '../lib/rpc/client';

// See README.md for details
class CasperLabsPluginHelper {
  private readonly call: <RESULT>(
    method: string,
    ...params: any[]
  ) => Promise<RESULT>;

  constructor() {
    this.call = registerClient();
  }

  async isConnected() {
    return this.call<boolean>('isConnected');
  }

  async requestConnection() {
    return this.call<void>('requestConnection');
  }

  async disconnectFromSite() {
    return this.call<void>('disconnectFromSite');
  }

  async removeSite() {
    return this.call<void>('removeSite');
  }

  async sign(deploy: JSON, publicKey: string) {
    return this.call<string>('sign', deploy, publicKey);
  }

  async getActivePublicKey() {
    return this.call<string>('getActivePublicKey');
  }
}

// inject to window, so that Clarity code could use it.
(window as any).casperlabsHelper = new CasperLabsPluginHelper();
