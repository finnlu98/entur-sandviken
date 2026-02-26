import React, { useEffect, useRef, useState } from "react";
import type { Address } from "../../../model/Adress";
import useAddressSearch from "./AdressHook";
import SearchInput from "../searchInput/SearchInput";

interface AdressSearchProps {
  onAddressSelect: (address: Address) => void;
  adress?: string;
  debounceMs?: number;
  readonly?: boolean;
  disabled?: boolean;
}

const AdressSearch: React.FC<AdressSearchProps> = ({
  onAddressSelect,
  adress = "",
  debounceMs = 500,
  readonly = false,
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(adress);
  const { results, isLoading, error, searchAddresses, clearResults } = useAddressSearch();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length < 3) {
      clearResults();
      return;
    }

    debounceTimer.current = setTimeout(() => {
      searchAddresses(value);
    }, debounceMs);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleSelect = (address: Address) => {
    setSearchTerm(address.frienldyName);
    clearResults();
    onAddressSelect(address);
  };

  return (
    <SearchInput<Address>
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      handleSelect={handleSelect}
      getDisplayText={(address) => `${address.frienldyName}, ${address.municipalityName ?? "Unknown Municipality"}`}
      getKey={(address, index) => `${address.coordinate.lat}-${address.coordinate.lon}-${index}`}
      placeholder="Search for an address..."
      isLoading={isLoading}
      error={error}
      results={results}
      readonly={readonly}
      disabled={disabled}
    />
  );
};

export default AdressSearch;
