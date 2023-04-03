import React from "react";

const Home = () => {
  return (
    <section>
      {matchMedia("(min-width: 768px)").matches ? (
        <Carousel />
      ) : (
        <CarouselPhone />
      )}
    </section>
  );
};

const Carousel = () => {
  return <div className="carousel"></div>;
};

const CarouselPhone = () => {
  return (
    <>
      <div className="carousel carousel-center mt-[-100px] h-96 rounded-box z-0">
        <div className="carousel-item h-full" id="item1">
          <img src="/src/assets/img/bahas-bahasa.jpg" alt="Bahas Bahasa" />
        </div>
        <div className="carousel-item h-full" id="item2">
          <img
            src="/src/assets/img/promo-bb-sairasa.jpg"
            alt="Promo Sairasa Bahas Bahasa"
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full rounded-none mt-[-65px] gap-4">
        <a href="#item1" className="w-6 h-6 border-2 border-black bg-base-300 flex items-center justify-center">
          1
        </a>
        <a href="#item2" className="w-6 h-6 border-2 border-black bg-base-300 flex items-center justify-center">
          2
        </a>
      </div>
    </>
  );
};

export default Home;
