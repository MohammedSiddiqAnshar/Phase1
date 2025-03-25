import PropTypes from 'prop-types';

function Task6(props) {
    return (
        <div className="details">
            <h1>Name: {props.name}</h1>
            <h1>Age: {props.age}</h1>
            <h1>City: {props.city}</h1>
        </div>
    );
}

Task6.defaultProps = {
    name: "Hello World",
    age: 20,
    city: "Coimbatore"
};

Task6.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    city: PropTypes.string
};

export default Task6;
    