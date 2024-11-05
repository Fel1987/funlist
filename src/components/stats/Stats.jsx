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

export default Stats;
