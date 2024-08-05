import React from 'react';

const MapIconAndLink = ({ location }) => {
    return (
        <div className='map-icon-and-address-wrapper'>
            <img 
                className='map-icon'
                alt='map-icon'
                src='/images/map.svg'
                onClick={
                    () => window.open(`https://google.com/maps/search/${location}`, '_blank')
                }
            />
            <p>{location}</p>
        </div>
    );
};

export default MapIconAndLink;
