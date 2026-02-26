import type { User } from './user';

export type Home = {
  name?: string;
  bannerUrl?: string;
  location?: { lat: number; lon: number };
  users?: User[];
};
