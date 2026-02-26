import type { User } from "./User";

export type Home = {
  name?: string;
  bannerUrl?: string;
  location?: { lat: number; lon: number };
  users?: User[];
};
