import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setFlightPortData } from './components/configure';
import { useDispatch } from 'react-redux';

function Deneme() {
    const apiUrl = 'http://webapi-dev.eba-j3p8idgy.eu-north-1.elasticbeanstalk.com/api/airports/getall';
    const [airports, setAirports] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setAirports(response.data.data);
                dispatch(setFlightPortData(response.data))
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    }, []);

    return (
        <div>
            <h1>Havaalanları</h1>
            <ul>
                {airports.map(airport => (
                    <li key={airport.id}>
                        {airport.explanation}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Deneme;
