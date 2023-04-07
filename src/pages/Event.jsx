import React from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import Loader from "../components/Loader";
import { getEventDetail } from "../utils/actions";
import { GrMap, GrCalendar } from "react-icons/gr";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(true);
  const [jumlahTiket, setJumlahTiket] = React.useState(1);
  const [hargaTiket, setHargaTiket] = React.useState(50000);

  if (!cookies.get("user")) {
    alert("Login dlu y mniezzz");
    return <Navigate to={"/"} />;
  }

  const increment = () => {
    setJumlahTiket(jumlahTiket + 1);
  }
  const decrement = () => {
    if (jumlahTiket > 1) {
      setJumlahTiket(jumlahTiket - 1);
    }
  }
  const handleJumlahTiket = () => {};

  const handleFetch = React.useCallback(() => {
    return getEventDetail(eventId).then((res) => { setEvent(res.data) });
  }, [event]) 

  React.useEffect(() => {
    if(event === {}) {
      handleFetch()
      console.log(event);
    }
  }, [event]);

  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row p-8 gap-24">
        <div>
          <div className="min-h-16 max-w-[800px] bg-white rounded-lg detail-event p-6">
            <div className="flex gap-12">
              <div>
                <img src={event.foto_event} alt="" width={350} />
              </div>
              <div className="">
                <h1 className="m-0 font-pixel_bold">{event.nama_event}</h1>
                <h3>{event.deskripsi_event}</h3>
                <div className="flex gap-3 items-center">
                  <GrCalendar className="w-4 h-4" />
                  <p className="text-base">{event.tanggal_event}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <GrMap className="w-4 h-4" />
                  <p className="text-base">{event.lokasi_event}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 detail-event bg-white rounded-lg p-7">
            asasjais
          </div>
        </div>
        <div className="detail-event bg-white min-w-72 max-h-72 border-base-200 p-8 rounded-lg">
          <h2 className="m-0 font-pixel_bold p-2 border-b-2">Detail Tiket</h2>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <img
                src="/src/assets/img/tickets.png"
                className="m-0 mt-5"
                alt="Tiket Icon"
                width={50}
              />
              <h4 className="m-0">Tiket</h4>
            </div>
            <div className="form-control mt-4">
              <div className="input-group rounded-none">
                <button className="btn" onClick={decrement}>{"<"}</button>
                <input
                  id="jumlahTiket"
                  readOnly
                  type="text"
                  className="input input-bordered w-[60px] font-pixel_bold"
                  value={jumlahTiket}
                  onChange={handleJumlahTiket}
                />
                <button className="btn" onClick={increment}>{">"}</button>
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-2">
              <img src="/src/assets/img/money.png" className="m-0 mt-5" width={50} alt="Uang Icon" />
              <h4 className="m-0">Harga</h4>
            </div>
            <h1 className="m-0">{jumlahTiket} x {hargaTiket}</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Event;
