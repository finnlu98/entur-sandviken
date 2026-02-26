import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import SearchInput from "../../../../core/shared/searchInput/SearchInput";
import type { TravelStop } from "../../model/StopSearchResponse";
import useStopSearch from "../../hooks/stop-hook";

interface SearchStopProps {
  onStopSelect: (stop: TravelStop) => void;
  placeholder?: string;
  debounceMs?: number;
}

export interface SearchStopHandle {
  clear: () => void;
}

const SearchStop = forwardRef<SearchStopHandle, SearchStopProps>(
  ({ onStopSelect, debounceMs = 500, placeholder }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { results, isLoading, error, searchAddresses, clearResults } = useStopSearch();
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setSearchTerm("");
        clearResults();
      },
    }));

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

    const handleSelect = (stop: TravelStop) => {
      setSearchTerm(stop.properties.label);
      clearResults();
      onStopSelect(stop);
    };

    return (
      <>
        <SearchInput<TravelStop>
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSelect={handleSelect}
          getDisplayText={(stop) => stop.properties.label}
          getKey={(stop, index) => `${stop.properties.id}-${index}`}
          placeholder={placeholder || "Search for a stop..."}
          isLoading={isLoading}
          error={error}
          results={results}
        />
      </>
    );
  },
);

SearchStop.displayName = "SearchStop";

export default SearchStop;
