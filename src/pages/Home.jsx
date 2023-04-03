import React from "react";
import { GrMap } from "react-icons/gr";

const Home = () => {
  return (
    <section>
      {matchMedia("(min-width: 768px)").matches ? (
        <Carousel />
      ) : (
        <CarouselPhone />
      )}
      <ListEvent />
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
        <a
          href="#item1"
          className="w-6 h-6 border-2 border-black bg-base-300 flex items-center justify-center"
        >
          1
        </a>
        <a
          href="#item2"
          className="w-6 h-6 border-2 border-black bg-base-300 flex items-center justify-center"
        >
          2
        </a>
      </div>
    </>
  );
};

const ListEvent = () => {
  return (
    <div className="p-3">
      <div className="p-3 ms-2">
        <h3 className="mb-3">Event</h3>
        <p className="font-mono">Kumpulan event yang sedang berlangsung</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center lg:justify-start">
        <div className="card card-compact w-72 shadow-xl z-0">
          <figure className="m-0"><img src="/src/assets/img/bahas-bahasa.jpg" alt="Event Bahas Bahasa"  /></figure>
          <div className="card-body">
            <p className="card-title m-0 text-base">Bahas Bahasa</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <GrMap className="w-4 h-4" />
                <p className="text-base font-mono m-0">Manado</p>
              </div>
              <div className="flex gap-3 items-center">
                <GrMap className="w-4 h-4" />
                <p className="text-base font-mono m-0">Manado</p>
              </div>
              <div className="flex items-center justify-between">
                <h3>Rp. 50.000</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-compact w-72 shadow-xl">
          <figure className="m-0"><img src="/src/assets/img/bahas-bahasa.jpg" alt="Event Bahas Bahasa"  /></figure>
          <div className="card-body">
            <p className="card-title m-0 text-base">Bahas Bahasa</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <GrMap className="w-4 h-4" />
                <p className="text-base font-mono m-0">Manado</p>
              </div>
              <div className="flex gap-3 items-center">
                <GrMap className="w-4 h-4" />
                <p className="text-base font-mono m-0">Manado</p>
              </div>
              <div className="flex items-center justify-between">
                <h3>Rp. 50.000</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
