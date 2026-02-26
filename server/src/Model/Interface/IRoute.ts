import type { Router } from "express";


export default interface IRoute {
    route: Router
    subRoute: string
    setRoute(): void

}