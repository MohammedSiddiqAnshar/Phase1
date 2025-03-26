import React, { memo, useState } from "react";

const Item = memo(({ name }) => {
  console.log(`Rendering ${name}`);
  return <li>{name}</li>;
});

const MemoizedList = () => {
  const [items] = useState(["Item 1", "Item 2", "Item 3"]);

  return (
    <ul>
      {items.map((item, index) => (
        <Item key={index} name={item} />
      ))}
    </ul>
  );
};

export default MemoizedList;
