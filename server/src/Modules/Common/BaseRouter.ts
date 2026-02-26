import { Router } from "express";
import type IRoute from "../../Model/Interface/IRoute";

export default abstract class BaseRouter implements IRoute {
  route: Router;
  subRoute: string;

  constructor(subRoute: string) {
    this.route = Router();
    this.subRoute = subRoute;

    this.setRoute();
  }

  abstract setRoute(): void;
}
