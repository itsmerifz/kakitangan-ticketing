import React from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";
import { GrMap, GrCalendar } from "react-icons/gr";
import { RotateLoader } from "react-spinners";
import Desktop1 from '../assets/img/1.webp'
import Desktop2 from '../assets/img/2.webp'
import Desktop3 from '../assets/img/3.webp'
import HP1 from '../assets/img/hp 1.webp'
import HP2 from '../assets/img/hp 2.webp'
import HP3 from '../assets/img/hp 3.webp'
import CoverBB from '../assets/img/bahas-bahasa.webp'


const Home = () => {
  const [carousel, setCarousel] = React.useState(0);
  const { data } = useLoaderData();
  const [event, setEvent] = React.useState([]);

  React.useEffect(() => {
    window.innerWidth > 768 ? setCarousel(1) : setCarousel(0);
    if (event.length === 0) {
      setEvent(data);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>KKTNGN | HOME</title>
      </Helmet>
      <div>{carousel === 1 ? <Carousel /> : <CarouselPhone />}</div>
      <section className="lg:p-10">
        <div className="p-3 ms-2">
          <h3 className="mb-3">Event</h3>
          <p className="font-mono">Kumpulan event yang sedang berlangsung</p>
        </div>
        {event.length > 0 ? (
          event.map((item, index) => {
            return <ListEvent key={index} foto={`${item.nama_event === 'Bahas Bahasa' ? CoverBB : item.fote_event}`} item={item} />;
          })
        ) : (
          <div className="w-full flex items-center justify-center">
            <RotateLoader color="#5b4000" />
          </div>
        )}
      </section>
    </>
  );
};

const Carousel = () => {
  return (
    <>
      <div className="carousel mt-[-35px] rounded-box m-0 p-0">
        <div id="item1" className="carousel-item h-full">
          <img src={Desktop1} width={1500} alt="Bahas Bahasa" />
        </div>
        <div id="item2" className="carousel-item h-full">
          <img src={Desktop2} width={1500} alt="Bahas Bahasa" />
        </div>
        <div id="item3" className="carousel-item h-full">
          <img src={Desktop3} width={1500} alt="Bahas Bahasa" />
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
        <a
          href="#item3"
          className="w-6 h-6 border-2 border-black bg-base-300 flex items-center justify-center"
        >
          3
        </a>
      </div>
    </>
  );
};

const CarouselPhone = () => {
  return (
    <>
      <div className="carousel mt-[-35px] h-96 rounded-box z-0">
        <div className="carousel-item h-full" id="item1">
          <img src={HP1} alt="Bahas Bahasa" />
        </div>
        <div className="carousel-item h-full" id="item2">
          <img src={HP2} alt="Promo Bahas Bahasa" />
        </div>
        <div className="carousel-item h-full" id="item3">
          <img src={HP3} alt="Promo Bahas Bahasa" />
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
        <a
          href="#item3"
          className="w-6 h-6 border-2 border-black bg-base-300 flex items-center justify-center"
        >
          3
        </a>
      </div>
    </>
  );
};

const ListEvent = ({ item, foto }) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="p-3 mb-5">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center lg:justify-start">
        <Link
          to={`/event/${item.id}`}
          className="card transition-all card-compact w-72 rounded-none event z-0"
        >
          <figure className="m-0">
            <img src={foto} alt="Event Bahas Bahasa" />
          </figure>
          <div className="card-body">
            <p className="card-title m-0 text-base">{item.nama_event}</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <GrCalendar className="w-4 h-4" />
                <p className="text-base font-mono m-0">{item.tanggal_event}</p>
              </div>
              <div className="flex gap-3 items-center">
                <GrMap className="w-4 h-4" />
                <p className="text-base font-mono m-0">{item.lokasi_event}</p>
              </div>
              <div className="flex items-center justify-between">
                <h3>{rupiah.format(item.harga_event)}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};



export default Home;
