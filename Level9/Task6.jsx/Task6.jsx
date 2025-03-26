import React from "react";

const Task6 = React.memo(({ onClick }) => {
    console.log("Rendering ChildButton...");
    return (
        <button onClick={onClick} style={{ marginTop: "20px", padding: "10px" }}>
        Child Button
        </button>
    );
});

export default Task6;
