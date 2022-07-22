import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.css'

import slide01 from '../../assets/bannerimages/banner01.jpg';
import slide02 from '../../assets/bannerimages/banner02.jpg';
import slide03 from '../../assets/bannerimages/banner03.jpg';

const Banner = () => {

  return (

    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide01}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Furniture</h3>
          <p>Get 60% OFF On All Products</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide02}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Cosmetics</h3>
          <p>Get 60% OFF On All Products</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide03}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Blessed Friday Sale</h3>
          <p>
            All Gadgets 60% OFF
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>




  )
}

export default Banner