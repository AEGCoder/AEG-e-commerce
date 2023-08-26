import React from 'react';
import { Carousel } from 'antd';
import './CarouselComponent.css'; // CSS dosyasını içe aktarın

const CarouselComponent = () => {
  return (
    <div>
      <Carousel autoplay>
        <div className="carousel-slide">
          <img
            src="/images/carousel1.svg"
            className="w-full  object-contain"
            alt=""
          />
        </div>
        <div className="carousel-slide">
          <img
            src="/images/carousel2.svg"
            className="w-full  object-contain"
            alt=""
          />
        </div>
        <div className="carousel-slide">
          <img
            src="/images/carousel3.svg"
            className="w-full object-contain"
            alt=""
          />
        </div>
        <div className="carousel-slide">
          <img
            src="/images/carousel4.svg"
            className="w-full  object-contain"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
