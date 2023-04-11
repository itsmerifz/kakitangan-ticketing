import React from "react";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useRecoilState } from "recoil";
import { getEventDetail, sendTrxRequest } from "../utils/actions";
import { jenisTrxState, totalHargaState, kodeTrxState } from "../utils/atoms";
import { GrMap, GrCalendar } from "react-icons/gr";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [jumlahTiket, setJumlahTiket] = React.useState(1);
  const [hargaTiket, setHargaTiket] = React.useState(50000);
  const [user, setUser] = React.useState(!localStorage.getItem("user") ? {} : JSON.parse(localStorage.getItem("user")));
  const [namaPemesan, setNamaPemesan] = React.useState(user.displayName);
  const [usernamePemesan, setUsernamePemesan] = React.useState("");
  const [jenisPembayaran, setJenisPembayaran] = React.useState("transfer");
  const [emailPemesan, setEmailPemesan] = React.useState(user.email);
  const [NoHpPemesan, setNoHpPemesan] = React.useState("");
  const [fixedJenisPembayaran, setFixedJenisPembayaran] = useRecoilState(jenisTrxState);
  const [totalHarga, setTotalHarga] = useRecoilState(totalHargaState);
  const [kodeTransaksi, setKodeTransaksi] = useRecoilState(kodeTrxState);
  const navigate = useNavigate();

  if (!cookies.get("user")) {
    alert("Login dlu y mniezzz");
    return <Navigate to={"/"} />;
  }

  const increment = () => {
    setJumlahTiket(jumlahTiket + 1);
  };
  const decrement = () => {
    if (jumlahTiket > 1) {
      setJumlahTiket(jumlahTiket - 1);
    }
  };

  React.useEffect(() => {
    getEventDetail(eventId).then((res) => {
      setEvent(res.data);
      setUsernamePemesan('')
      setNoHpPemesan('')
      setIsLoading(false);
    });
    console.log(event);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleTransaksi = async () => {
    if(!namaPemesan || !usernamePemesan || !emailPemesan || !NoHpPemesan) return alert("Data tidak boleh kosong");

    if (jumlahTiket > 0) {
      setIsLoading(true);
      const data = {
        nama_pemesan: namaPemesan,
        sosmed: usernamePemesan,
        email: emailPemesan,
        jumlah_tiket: jumlahTiket,
        total_harga: jumlahTiket * hargaTiket,
        id_event: eventId,
        no_hp: NoHpPemesan,
        jenis_pembayaran: jenisPembayaran,
        id_user: user.uid,
      };
      sendTrxRequest(data).then((res) => {
        console.log(res.data.kode_transaksi);
        setFixedJenisPembayaran(jenisPembayaran);
        setTotalHarga(jumlahTiket * hargaTiket);
        setKodeTransaksi(res.data.kode_transaksi);
        setIsLoading(false);
        navigate("/success");
      });

    }
  }


  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row p-8 gap-24">
        <div>
          <div className="min-h-16 max-w-[800px] bg-white rounded-lg detail-event p-6">
            <div className="flex gap-12">
              <div className="hidden lg:block">
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
            <h2 className="m-0 p-3 border-b-2 border-current font-pixel_bold">
              Detail Pembeli
            </h2>
            <form className="form-control">
              <div className="flex flex-col gap-4">
                <label className="label mt-3">
                  <span className="label-text">Nama Lengkap</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-none"
                  placeholder="cth. Indra Laikun"
                  value={namaPemesan}
                  onChange={e => setNamaPemesan(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="label mt-3">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-none"
                  placeholder="cth. @_kakitangan (Instagram)"
                  value={emailPemesan}
                  onChange={e => setEmailPemesan(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="label mt-3">
                  <span className="label-text">Username Social Media (IG/Twitter/FB)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-none"
                  placeholder="cth. @_kakitangan (Instagram)"
                  value={usernamePemesan}
                  onChange={e => setUsernamePemesan(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="label mt-3">
                  <span className="label-text">Nomor Telepon</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-none"
                  placeholder="cth. +6281234567890"
                  value={NoHpPemesan}
                  onChange={e => setNoHpPemesan(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="detail-event bg-white w-fit lg:w-96 lg:max-h-auto border-base-200 p-8 rounded-lg">
            <h2 className="m-0 font-pixel_bold p-2 border-b-2">Detail Tiket</h2>
            <div className="flex flex-col gap-4 mb-5">
                <label className="label mt-3">
                  <span className="label-text">Jenis Pembayaran</span>
                </label>
                <select onChange={e => setJenisPembayaran(e.target.value)} value={jenisPembayaran} className="select w-full max-w-md input rounded-none">
                  <option value="transfer">Transfer</option>
                  <option value="cod">Cash On Delivery</option>
                </select>
              </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <img
                  src="/src/assets/img/tickets.webp"
                  className="m-0 mt-5"
                  alt="Tiket Icon"
                  width={50}
                />
                <h4 className="m-0">Tiket</h4>
              </div>
              <div className="form-control mt-4">
                <div className="input-group rounded-none z-auto">
                  <button className="btn" onClick={decrement}>
                    {"<"}
                  </button>
                  <input
                    id="jumlahTiket"
                    readOnly
                    type="text"
                    className="input input-bordered w-[60px] font-pixel_bold"
                    value={jumlahTiket}
                  />
                  <button className="btn" onClick={increment}>
                    {">"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="flex flex-col gap-2">
                <img
                  src="/src/assets/img/money.webp"
                  className="m-0 mt-5"
                  width={50}
                  alt="Uang Icon"
                />
                <h4 className="m-0">Harga</h4>
              </div>
              <div className="flex flex-col items-center p-3 gap-4">
                <h3 className="m-0 ms-auto">
                  {jumlahTiket}x {rupiah.format(hargaTiket)}
                </h3>
                <h2 className="m-0">
                  {" "}
                  = {rupiah.format(jumlahTiket * hargaTiket)}
                </h2>
              </div>
            </div>
          </div>
          <button onClick={handleTransaksi} className="tombol-beli ms-auto p-7 font-pixel_bold text-blue-700 w-52">
            &nbsp; &nbsp;
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Event;
