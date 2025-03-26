import React from "react";
import { FixedSizeList as List } from "react-window";

const totalItems = 10000;


const Row = ({ index, style }) => (
    <div style={{ ...style, padding: "10px", borderBottom: "1px solid #ddd" }}>
        Item #{index + 1}
    </div>
    );

    const App = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Virtual Scrolling with react-window</h1>
        <p>Efficiently renders 10,000 items with smooth scrolling.</p>

        <List
            height={500}     
            itemCount={totalItems} 
            itemSize={35}   
            width={"100%"}
        >
            {Row}
        </List>
        </div>
    );
};

export default App;
