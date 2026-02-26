import BaseRouter from "../Common/BaseRouter";
import StockFetcher from "./StockFetcher";
import type { Request, Response } from "express";

interface SetTickersRequest {
    tickers: string[];
}

export default class StockRouter extends BaseRouter {
    fetcher: StockFetcher
    constructor() {
            super("/stock")
            this.fetcher = new StockFetcher(12 * 60 * 60_000)
            this.setRoute();
        }
    
    setRoute(): void {
        this.route.post(this.subRoute, async (req: Request, res: Response) => {
            const {tickers} = req.body as SetTickersRequest;

            this.fetcher.setTickers(tickers)
            
            res.send({stocks: await this.fetcher.getData()} )
        })
    }

}