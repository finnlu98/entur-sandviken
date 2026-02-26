import apiClient from "../../../api/ApiClient";
import type { StockResponse } from "../model/StockResponse";

const StockFetcher = async (tickers: string[]) => {
  try {
    const endpoint = process.env.REACT_APP_STOCK_ENDPOINT ?? "";
    const res = await apiClient.post<StockResponse>(endpoint, {
      tickers: tickers,
    });
    return res.data;
  } catch (error) {
    console.error("Can't get stock data");
    throw error;
  }
};

export default StockFetcher;
