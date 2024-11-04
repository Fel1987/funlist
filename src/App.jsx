import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAllItemsDelete() {
    const userInput = window.confirm(
      "Do you really want to delete all these Items"
    );

    if (userInput) setItems([]);
  }

  function handleAddItems(itemObj) {
    setItems((currItems) => [...currItems, itemObj]);
  }

  function handleDeleteItems(id) {
    setItems((currItems) =>
      currItems.filter((filterItem) => filterItem.id !== id)
    );
  }

  function handleToggleItem(id) {
    setItems((currItems) =>
      currItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onHandleToggleItem={handleToggleItem}
        onAllItemsDelete={handleAllItemsDelete}
      />
      <Stats items={items} />
    </>
  );
}

function Logo() {
  return <h1>🌴Far Away🏖️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for your trip?</h3>
      <select
        onChange={(event) => {
          setQuantity(Number(event.target.value));
          console.log(quantity);
        }}
        value={quantity}
        name=""
        id=""
      >
        {Array.from({ length: 20 }, (value, index) => {
          return index + 1;
        }).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        value={description}
        type="text"
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  );
}

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

function Item({ item, onDeleteItem, onHandleToggleItem }) {
  return (
    <li style={{ textDecoration: item.packed && "line-through" }}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onHandleToggleItem(item.id);
        }}
      />
      <span>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const packedItemsNum = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((packedItemsNum / numItems) * 100);

  if (!numItems) {
    return (
      <footer className="stats">
        <em>You don't have any items yet, add some!</em>
      </footer>
    );
  }

  return (
    <footer className="stats">
      {percentagePacked !== 100 ? (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {packedItemsNum} ({percentagePacked}%)
        </em>
      ) : (
        "You are all set!"
      )}
    </footer>
  );
}
