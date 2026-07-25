import "./SearchBar.css";

function SearchBar({ keyword, setKeyword }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
