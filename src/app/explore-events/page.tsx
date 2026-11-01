import React from 'react';




const ExploreEvent = async () => {

    const res = await fetch('http://localhost:5000/explore-sevent', {
        method: 'GET',
    
    })
    const data = await res.json()
    console.log(data)
    return (
        <div>

        </div>
    );
};

export default ExploreEvent;



