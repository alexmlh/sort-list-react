export default function SearchBar({ onSearchChange, onInStockChange }) {
  return (
    <div className="search-bar">
      <h1>List of Items</h1>
      <input type="input" placeholder="Search..." onChange={onSearchChange} />
      <br />
      <input type="checkbox" name="checkbox" onChange={onInStockChange} />
      <label htmlFor="checkbox"> Only show products in stock</label>
    </div>
  );
}
