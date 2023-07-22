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
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/218/1600/600"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/229/1600/600"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/238/1600/600"
                    alt="Fourth slide"
                />

                <Carousel.Caption>
                    <h3>Fourth slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
           
          
        </Carousel>
    );
}


export default CarouselComponent
