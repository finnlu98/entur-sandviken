import configFile from './Configuration.json';

class AppConfig {
  configuration: object;

  constructor() {
    this.configuration = configFile;
  }
}

const appConfig = new AppConfig();
export default appConfig;
