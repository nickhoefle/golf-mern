import React from 'react';

const DeleteGolfOuting = ({ outingId, outingUser, outingDate, outingAddedOrDeletedListener }) => {

    const handleDeleteOuting = async (outingId, user, date) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${user}'s outing from ${date}?`);
        if (confirmation) {
            try {
                const response = await fetch(`/api/golf-outings/${outingId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
    
                outingAddedOrDeletedListener();
                
            } catch (error) {
                console.error('Error deleting golf outing:', error);
            }
        } else {
            return;
        }
    };


    return (
        <img 
            src='/images/trash.svg'
            className='delete-outing-icon'
            alt='delete-outing'
            onClick={() => handleDeleteOuting(outingId, outingUser, outingDate)}
        />   
    );
};

export default DeleteGolfOuting;