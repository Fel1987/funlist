import { useState } from "react";
import Item from "../item/Item";

function PackingList({
  items,
  onDeleteItem,
  onHandleToggleItem,
  onAllItemsDelete,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              onHandleToggleItem={onHandleToggleItem}
              items={items}
              onDeleteItem={onDeleteItem}
              item={item}
              key={item.id}
            />
          );
        })}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by the Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort packed Status</option>
        </select>
        <button onClick={onAllItemsDelete}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;
