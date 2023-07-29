import React from 'react'

import Carousel from 'react-bootstrap/Carousel';

import './index.scss'

function CarouselComponent() {
    return (
        <Carousel className='carousel__container' >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.strath.ac.uk/professionalservices/media/ps/estatesmanagement/images/1600x600/plane.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/218/1600/600"
                    alt="Second slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/229/1600/600"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/238/1600/600"
                    alt="Fourth slide"
                />
                <Carousel.Caption>
                    
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent
