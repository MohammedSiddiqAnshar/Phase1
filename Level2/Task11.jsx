function Task11() {
    const items = ['Apple', 'Banana', 'Orange', 'Mango'];

    return (
        <div>
            <h2>Fruits List:</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Task11;
