import React, { useEffect } from 'react'

import CarouselComponent from './carousel'
import SearchContent from './searchContent'
import { setFlightPortData } from '../configure'

import './index.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

function Content() {
    const apiUrl = 'http://webapi-dev.eba-j3p8idgy.eu-north-1.elasticbeanstalk.com/api/airports/getall';
    const fligthPortData = useSelector((state) => state.portsData.fligthPortData);

    console.log('FLİGTHPORTSDATA', fligthPortData)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                dispatch(setFlightPortData(response.data))
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    }, []);

    return (
        <div className='content-container' >
            <CarouselComponent />
            <SearchContent />
        </div>
    )
}

export default Content
