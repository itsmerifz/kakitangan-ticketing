import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();
const Konfirmasi = () => {
  if (!cookies.get("user")) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="p-3 flex items-center justify-center mt-5">
      <div className="h-auto w-[1024px] bg-slate-400 p-3 box-konfirmasi">
        <div className="flex flex-col items-center justify-center">
          <h2 className="border-b-2 border-current p-3">Konfirmasi Tiketmu!</h2>
          <FormKonfirmasi />
        </div>
      </div>
    </div>
  );
};

const FormKonfirmasi = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [kodeTransaksi, setKodeTransaksi] = React.useState("");
  const [namaBank, setNamaBank] = React.useState("");
  const [buktiTransaksi, setBuktiTransaksi] = React.useState(null);

  const handleUpload = async () => {

  };

  React.useEffect(() => {});

  return (
    <React.Fragment>
      <form
        encType="multipart/form-data"
        className="flex flex-col items-center lg:ngw-96 h-auto"
      >
        <div className="form-control w-full justify-start">
          <label className="label">
            <span className="label-text">Kode Transaksi</span>
          </label>
          <input
            readOnly
            placeholder="Tidak ada transaksi"
            type="text"
            className="input input-bordered border-2 border-current justify-center rounded-none w-full"
            onChange={e => setKodeTransaksi(e.target.value)}
          />
        </div>
        <div className="form-control w-full justify-start mt-3">
          <label className="label">
            <span className="label-text">Nama Bank / E-Wallet</span>
          </label>
          <input
            type="text"
            placeholder="cth. GO-PAY / Bank BNI"
            className="input input-bordered border-2 border-current justify-center rounded-none w-full"
            onChange={e => setNamaBank(e.target.value)}
          />
        </div>
        <div className="form-control w-full justify-start mt-3">
          <label className="label">
            <span className="label-text">Bukti Transaksi</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered border-2 border-current justify-center rounded-none w-full"
            onChange={e => setBuktiTransaksi(e.target.files[0])}
          />
        </div>
      </form>
      <button className="h-36 w-auto tombol font-bold p-6">
        <span className="me-1 mb-3">KONFIRMASI</span>
      </button>
    </React.Fragment>
  );
};

export default Konfirmasi;
