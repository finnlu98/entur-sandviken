import config from './Configuration.json';

class Configuration {
  private readonly configuration: AppConfiguration;

  constructor() {
    this.configuration = config as AppConfiguration;
    this.getHomeAssistantConfig().secretToken =
      process.env.REACT_APP_HOME_ASSISTANT_SECRET_TOKEN ?? '';
    this.configuration.Stocks.StockData.Endpoint = process.env.REACT_APP_STOCK_ENDPOINT ?? '';
  }

  public getHomeConfig(): Home {
    return this.configuration.ClientData.Home;
  }

  public getIdentifierConfig(): string {
    return this.configuration.ClientData.ClientIdentifier;
  }

  public getEnturConfig(): EnturConfig {
    return this.configuration.Entur;
  }

  public getKanyeQuoteEndpoint(): string {
    return this.configuration.KanyeQuoute.Endpoint;
  }

  public getElectricityEndpoint(): string {
    return this.configuration.ElectricityPrices.Endpoint;
  }

  public getWeatherEndpoint(): string {
    return this.configuration.Weather.Endpoint;
  }

  public getSunriseEndpoint(): string {
    return this.configuration.Sunrise.Endpoint;
  }

  public getHomeAssistantConfig(): HomeAssitantConfig {
    return this.configuration.HomeAssistant;
  }

  public getCalenderConfig(): CalenderConfig {
    return this.configuration.Calender;
  }

  public getElviaConfig(): ElviaConfig {
    return this.configuration.Elvia;
  }

  public getOsloCityBikeConfig(): OsloCityBikeConfig {
    return this.configuration.OsloCityBike;
  }

  public getNewsConfig(): NewsConfig {
    return this.configuration.News;
  }

  public getStockConfig(): StockConfig {
    return this.configuration.Stocks;
  }

  public getAdressLookupEndpoint(): string {
    return this.configuration.Kartverket.AdressLookup.Endpoint;
  }

  public getSwimmingConfig(): SwimmingConfig {
    return this.configuration.Swimming;
  }
}

interface AppConfiguration {
  ClientData: ClientData;
  Entur: EnturConfig;
  ElectricityPrices: ElectricityPricesConfig;
  KanyeQuoute: KanyeQuoteConfig;
  Weather: WeatherConfig;
  Sunrise: SunriseConfig;
  HomeAssistant: HomeAssitantConfig;
  Calender: CalenderConfig;
  Elvia: ElviaConfig;
  OsloCityBike: OsloCityBikeConfig;
  News: NewsConfig;
  Stocks: StockConfig;
  Kartverket: KartverketConfig;
  Swimming: SwimmingConfig;
}

interface ClientData {
  ClientIdentifier: string;
  Home: Home;
}

interface Home {
  lat: number;
  lon: number;
}

interface EnturConfig {
  Identifier: string;
  StopRegister: EndpointConfig;
  TravelPlanner: EndpointConfig;
}

interface EndpointConfig {
  Endpoint: string;
}

type ElectricityPricesConfig = EndpointConfig;

type KanyeQuoteConfig = EndpointConfig;

type WeatherConfig = EndpointConfig;

type SunriseConfig = EndpointConfig;

interface HomeAssitantConfig extends EndpointConfig {
  secretToken?: string;
}

interface CalenderConfig extends EndpointConfig {
  maxResults: number;
}

interface ElviaConfig {
  Consumption: EndpointConfig;
  Tariffs: EndpointConfig;
}

interface OsloCityBikeConfig {
  StationsInformation: EndpointConfig;
  Status: EndpointConfig;
}

interface NewsConfig {
  NRK: EndpointConfig;
}

interface StockConfig {
  StockData: EndpointConfig;
}

interface KartverketConfig {
  AdressLookup: EndpointConfig;
}

type SwimmingConfig = EndpointConfig;

const configuration = new Configuration();
export default configuration;
