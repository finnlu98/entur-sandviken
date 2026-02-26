import apiClient from '../../../api/api-client';
import type { StockResponse } from '../model/stock-response';

const StockFetcher = async (tickers: string[]) => {
  try {
    const endpoint = import.meta.env.VITE_STOCK_ENDPOINT ?? '';
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
