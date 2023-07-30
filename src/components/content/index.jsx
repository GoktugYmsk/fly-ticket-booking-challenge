import React, { useEffect } from 'react'

import CarouselComponent from './carousel'
import SearchContent from './searchContent'
import { setFlightPortData } from '../configure'

import './index.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

function Content() {


    return (
        <div className='content-container' >
            <CarouselComponent />
            <SearchContent />
        </div>
    )
}

export default Content
