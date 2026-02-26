import { useState } from 'react';
import type { TravelStop } from '../model/stop-search-response';
import SearchStopFetcher from '../api/stop-register-fetcher';

const useStopSearch = () => {
  const [results, setResults] = useState<TravelStop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAddresses = async (searchTerm: string) => {
    if (searchTerm.trim().length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const stops = await SearchStopFetcher(searchTerm);
      setResults(stops);
    } catch {
      setError('Failed to fetch addresses');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => setResults([]);

  return { results, isLoading, error, searchAddresses, clearResults };
};

export default useStopSearch;
