import React from 'react';

const SortAndFilterOutings = ({ onSortChange }) => {

    const handleSortChange = (e) => {
        const selectedSortBy = e.target.value;
        onSortChange(selectedSortBy); // Trigger the sort in parent component
    };

    return (
        <div className='sort-and-filter-wrapper'>
            <h2>Sort and Filter Outings</h2>
            <div className='sort-items-wrapper'>
                <img 
                    alt='sort-icon'
                    src='/images/sort.svg' 
                    className='sort-outings-icon'
                />
                <label>
                    <input 
                        defaultChecked
                        type="radio" 
                        name="sort" 
                        value="newest" 
                        onChange={handleSortChange} 
                    />
                    Newest First
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="sort" 
                        value="oldest" 
                        onChange={handleSortChange} 
                    />
                    Oldest First
                </label>
            </div>
        </div>
    );
};

export default SortAndFilterOutings;
