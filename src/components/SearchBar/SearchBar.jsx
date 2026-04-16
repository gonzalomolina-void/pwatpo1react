import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input 
          type="text" 
          placeholder={placeholder} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />
        {value && (
          <button 
            className="search-clear-btn" 
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            type="button"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
