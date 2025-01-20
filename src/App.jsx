import React, { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import allItems from "./items"; // Import the items list

export default function ItemForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending by default
  const [sortCriteria, setSortCriteria] = useState("price"); // Sorting by price by default
  const [filteredItems, setFilteredItems] = useState(allItems);

  function handleSearchChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, showInStockOnly, sortOrder, sortCriteria);
  }

  function handleInStockChange(event) {
    const inStockOnly = event.target.checked;
    setShowInStockOnly(inStockOnly);
    applyFilters(searchQuery, inStockOnly, sortOrder, sortCriteria);
  }

  function handleSortByPrice() {
    const newSortOrder =
      sortCriteria === "price" && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortCriteria("price");
    applyFilters(searchQuery, showInStockOnly, newSortOrder, "price");
  }

  function handleSortByName() {
    const newSortOrder =
      sortCriteria === "name" && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortCriteria("name");
    applyFilters(searchQuery, showInStockOnly, newSortOrder, "name");
  }

  function applyFilters(query, inStockOnly, sort, criteria) {
    const regex = new RegExp(`^${query}`, "i");
    const filtered = allItems.filter((item) => {
      const matchesSearch = regex.test(item.name.toLowerCase());
      const matchesStock = inStockOnly ? item.stocked : true;
      return matchesSearch && matchesStock;
    });

    const sorted = filtered.sort((a, b) => {
      if (criteria === "price") {
        const priceA = Number(a.price.slice(1));
        const priceB = Number(b.price.slice(1));
        return sort === "asc" ? priceA - priceB : priceB - priceA;
      } else {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sort === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });

    setFilteredItems(sorted);
  }

  return (
    <div className="mockup">
      <SearchBar
        onSearchChange={handleSearchChange}
        onInStockChange={handleInStockChange}
      />
      <ItemList
        items={filteredItems}
        onSortByPrice={handleSortByPrice}
        onSortByName={handleSortByName}
        sortOrder={sortOrder}
        sortCriteria={sortCriteria}
      />
    </div>
  );
}
