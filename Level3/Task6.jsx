import { useState } from 'react';

function Task6() {
    // Sample list of items
    const initialList = [
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Grape',
        'Kiwi',
        'Mango',
        'Orange',
        'Pineapple',
        'Strawberry'
    ];

    // State to hold the search term
    const [searchTerm, setSearchTerm] = useState('');

    // Filter logic based on user input
    const filteredList = initialList.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="filter-container">
            <h2>Search & Filter List</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            
            <ul>
                {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                ) : (
                    <li>No items found</li>
                )}
            </ul>
        </div>
    );
}


export default Task6