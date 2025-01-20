export default function ItemList({
  items,
  onSortByPrice,
  onSortByName,
  sortOrder,
  sortCriteria,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ cursor: "pointer" }} onClick={onSortByName}>
            Name (sort:{" "}
            {sortCriteria === "name" && sortOrder === "asc" ? "↑" : "↓"})
          </th>
          <th style={{ cursor: "pointer" }} onClick={onSortByPrice}>
            Price (sort:{" "}
            {sortCriteria === "price" && sortOrder === "asc" ? "↑" : "↓"})
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={2}>Fruits</th>
        </tr>
        <ItemRows items={items.filter((item) => item.category === "Fruits")} />
        <tr>
          <th colSpan={2}>Vegetables</th>
        </tr>
        <ItemRows
          items={items.filter((item) => item.category === "Vegetables")}
        />
      </tbody>
    </table>
  );
}

function ItemRows({ items }) {
  return (
    <>
      {items.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td style={{ textAlign: "right" }}>{item.price}</td>
        </tr>
      ))}
    </>
  );
}
