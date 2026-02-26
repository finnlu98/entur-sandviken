export enum WidgetEnum {
  Header = 'Header',
  Weather = 'Weather',
  Stocks = 'Stocks',
  News = 'News',
  LaundryWeek = 'Laundry Week',
  HomeActions = 'Home Actions',
  Electricity = 'Electricity',
  CityBike = 'City Bike',
  Calender = 'Calender',
  BusCards = 'Bus Cards',
  Swimming = 'Swimming',
}

export interface WidgetDefinition<TConfig, TData = unknown, TError = unknown> {
  id: WidgetEnum;
  friendlyName: string;
  widgetIcon: React.ReactNode;
  widgetComponent: React.ComponentType<any>;
  useQuery?: (config?: TConfig) => {
    data?: TData;
    isLoading?: boolean;
    error?: TError;
  };
  widgetConfig?: WidgetConfig<TConfig>;
  defaultWidgetStyling?: boolean;
  defaultColSpan: number;
  defaultRowSpan: number;
  boolenHiddenSupported?: boolean;
  fetchtingInterval?: number;
}

export interface WidgetConfig<TConfig> {
  component?: React.ComponentType<any>;
  documentation?: React.ComponentType<any>;
  config?: TConfig;
}
