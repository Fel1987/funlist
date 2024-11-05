import { useState } from "react";

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

export default Form;
