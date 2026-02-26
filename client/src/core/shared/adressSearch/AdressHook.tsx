import { useState } from 'react';
import SearchAdressFetcher from './AdressApi';
import type { Address } from '../../../model/Adress';

const useAddressSearch = () => {
  const [results, setResults] = useState<Address[]>([]);
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
      const addresses = await SearchAdressFetcher(searchTerm);
      setResults(addresses);
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

export default useAddressSearch;
