import React from "react";
import { FixedSizeList as List } from "react-window";

const totalItems = 10000;

const Row = ({ index, style }) => (
  <div style={{ ...style, padding: "10px", borderBottom: "1px solid #ddd" }}>
    Item #{index + 1}
  </div>
);

const VirtualizedList = () => {
  return (
    <List height={500} itemCount={totalItems} itemSize={35} width={"100%"}>
      {Row}
    </List>
  );
};

export default VirtualizedList;
