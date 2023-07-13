import React, { useEffect, useState } from 'react'
import CarouselComponent from './carousel'
import SearchContent from './searchContent'
import PassengerService from './passengerService'

import './index.scss'

function Content() {

    const [countries, setCountries] = useState()



    return (
        <div className='content-container' >
            <CarouselComponent />
            <SearchContent />
            <PassengerService/>
        </div>
    )
}

export default Content
