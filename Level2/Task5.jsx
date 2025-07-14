function Task5(props) {
    return (
        <div className="details">
            <h1>Name:{props.name}</h1>
            <h1>Age:{props.age}</h1>
            <h1>City:{props.city}</h1>
        </div>
    );
}

Task5.defaultProps = {
    name: "Hello World",
    age: 20,
    city:"coimbatore"
};

export default Task5;