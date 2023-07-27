import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Deneme() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://webapi-dev.eba-j3p8idgy.eu-north-1.elasticbeanstalk.com/api/baseprices/getall';

        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log('mock Data', data);

    return (
        <div>
            <h1>Data from API:</h1>
            <ul>
                {data.map((item, key) => (
                    <div key={key}>
                        <p>{item.airline}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Deneme;
