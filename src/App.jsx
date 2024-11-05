import { useState } from "react";
import Logo from "./components/logo/Logo";
import Form from "./components/form/Form";
import PackingList from "./components/packing-list/PackinList";
import Stats from "./components/stats/Stats";

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
