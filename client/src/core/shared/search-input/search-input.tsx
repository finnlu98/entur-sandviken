import './search-input.css';

interface SearchInputProps<T> {
  searchTerm: string;
  handleSearch: (value: string) => void;
  handleSelect: (item: T) => void;
  getDisplayText: (item: T) => string;
  getKey: (item: T, index: number) => string;
  placeholder?: string;
  error?: string | null;
  isLoading?: boolean;
  results: T[];
  disabled?: boolean;
  readonly?: boolean;
}

function SearchInput<T>({
  searchTerm,
  handleSearch,
  handleSelect,
  getDisplayText,
  getKey,
  placeholder,
  error,
  isLoading,
  results,
  disabled,
  readonly,
}: SearchInputProps<T>) {
  return (
    <div className="search-input-container">
      <div style={{ position: 'relative' }}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder || 'Search...'}
          disabled={disabled}
          readOnly={readonly}
        />
        {isLoading && <div className="small-loading-spinner" />}
      </div>
      {error && <div>{error}</div>}

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result, index) => (
            <li
              className="search-result-item"
              key={getKey(result, index)}
              onClick={() => handleSelect(result)}
            >
              {getDisplayText(result)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
