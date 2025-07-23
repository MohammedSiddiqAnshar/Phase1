function Task4(props) {
    return (
        <div className="details">
            <h1>Name:{props.name}</h1>
            <h1>Department:{props.dept}</h1>
        </div>
    );
}

Task4.defaultProps = {
    name: "Hello World",
    dept: "CS"
};

export default Task4;
