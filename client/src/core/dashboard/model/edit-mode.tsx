export type EditModeState = {
  editMode: boolean;
  editingWidgetKey: EditingKey | null;
};

export enum EditingKey {
  LayoutTemplate = 'Layout Template',
  Profile = 'Profile',
  Weather = 'Weather',
  Stocks = 'Stocks',
  News = 'News',
  LaundryWeek = 'Laundry  Week',
  HomeActions = 'Home Actions',
  Electricity = 'Electricity',
  CityBike = 'City Bike',
  Calender = 'Calender',
  BusCards = 'Bus Cards',
}
