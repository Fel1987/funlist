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

export default Item;
