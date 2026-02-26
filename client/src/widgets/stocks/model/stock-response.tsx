
export class StockResponse {
    stocks!: Stock[]
}

class Stock {
    symbol!: string
    fiftyDayAverageChangePercent!: string
}