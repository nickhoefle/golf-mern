import React from 'react';

const MapIconAndLink = ({ address }) => {
    return (
        <div className='map-icon-and-address-wrapper'>
            <img 
                className='map-icon'
                alt='map-icon'
                src='/images/map.svg'
                onClick={
                    () => window.open(`https://google.com/maps/search/${address}`, '_blank')
                }
            />
            <p>{address}</p>
        </div>
    );
};

export default MapIconAndLink;
