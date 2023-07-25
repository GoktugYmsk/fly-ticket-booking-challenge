import React from 'react'

import CarouselComponent from './carousel'
import SearchContent from './searchContent'

import './index.scss'

function Content() {

    return (
        <div className='content-container' >
            <CarouselComponent />
            <SearchContent />
        </div>
    )
}

export default Content
