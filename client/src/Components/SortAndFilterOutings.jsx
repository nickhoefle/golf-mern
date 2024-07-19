import React from 'react';

const SortAndFilterOutings = ({ onSortChange, onFilterChange, userEmail }) => {

    const handleSortChange = (e) => {
        const selectedSortBy = e.target.value;
        onSortChange(selectedSortBy); // Trigger the sort in parent component
    };

    const handleFilterChange = (e) => {
        const selectedFilterBy = e.target.value;
        onFilterChange(selectedFilterBy); // Trigger the filter in parent component
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
            <div className='filter-items-wrapper'>
                <img 
                    alt='filter-icon'
                    src='/images/filter.svg' 
                    className='filter-outings-icon'
                />
                <label>
                    <input 
                        defaultChecked
                        type="radio" 
                        name="filter" 
                        value="all" 
                        onChange={handleFilterChange} 
                    />
                    All Golfers
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="filter" 
                        value={userEmail} 
                        onChange={handleFilterChange} 
                    />
                    Only Me
                </label>
            </div>
        </div>
    );
};

export default SortAndFilterOutings;
