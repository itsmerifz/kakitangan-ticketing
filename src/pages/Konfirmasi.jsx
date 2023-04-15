import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getUserTransaction, sendConfirmationTicket } from "../utils/actions";
import { storage } from "../utils/firebase";
import Loader from "../components/Loader";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

const cookies = new Cookies();
const Konfirmasi = () => {
  if (!cookies.get("user")) {
    return <Navigate to={"/"} />;
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>KKTNGN | Konfirmasi Pembayaran</title>
      </Helmet>
      <div className="p-3 flex items-center justify-center mt-5">
        <div className="h-auto w-[1024px] bg-slate-400 p-3 box-konfirmasi mb-6">
          <div className="flex flex-col items-center justify-center">
            <h2 className="border-b-2 border-current p-3">
              Konfirmasi Tiketmu!
            </h2>
            <FormKonfirmasi />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const FormKonfirmasi = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [kodeTransaksi, setKodeTransaksi] = React.useState("");
  const [namaBank, setNamaBank] = React.useState("");
  const [buktiTransaksi, setBuktiTransaksi] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [statusPembayaran, setStatusPembayaran] = React.useState("");

  const handleUpload = () => {
    if (!buktiTransaksi) return alert("Upload bukti transfer dulu y");
    setIsUploading(true);
    // UPLOAD FILE
    const storageRef = ref(storage, `/bukti-bayar/${kodeTransaksi}`);
    const uploadTask = uploadBytesResumable(storageRef, buktiTransaksi);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            status_pembayaran: "menunggu konfirmasi",
            id: kodeTransaksi,
            nama_bank: namaBank,
            file_bukti: downloadURL,
          };
          sendConfirmationTicket(data).then((res) => {
            window.location.reload();
          });
          setIsUploading(false);
        });
      }
    );
  };

  React.useEffect(() => {
    const user = cookies.get("user");
    getUserTransaction(user).then((res) => {
      setKodeTransaksi(res.data?.[0].id);
      setStatusPembayaran(res.data?.[0].status_pembayaran);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {statusPembayaran === "menunggu konfirmasi" ? (
        <React.Fragment>
          <div className="flex flex-col items-center justify-center p-5">
            <h2 className="m-0 pb-3">Terima Kasih!</h2>
            <p className="text-center text-xl">
              Kami akan segera memproses pembayaran kamu. Jika ada pertanyaan silahkan hubungi kami <a href="http://wa.me/6282293324474">disini</a>. Tiket kamu akan dikirim via email. Jangan lupa cek ya! 
            </p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form
            encType="multipart/form-data"
            className="flex  flex-col items-center lg:ngw-96 h-auto"
          >
            <div className="form-control w-full justify-start">
              <label className="label">
                <span className="label-text">Kode Transaksi</span>
              </label>
              <input
                readOnly
                placeholder="Tidak ada transaksi"
                type="text"
                value={kodeTransaksi}
                className="input input-bordered border-2 border-current justify-center rounded-none w-full"
                onChange={(e) => setKodeTransaksi(e.target.value)}
              />
            </div>
            <div className="form-control w-full justify-start mt-3">
              <label className="label">
                <span className="label-text">Nama Bank / E-Wallet</span>
              </label>
              <input
                type="text"
                placeholder="cth. GO-PAY / Bank BNI"
                value={namaBank}
                className="input input-bordered border-2 border-current justify-center rounded-none w-full"
                onChange={(e) => setNamaBank(e.target.value)}
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
                onChange={(e) => setBuktiTransaksi(e.target.files[0])}
              />
            </div>
          </form>
          <button
            onClick={handleUpload}
            className="h-36 w-auto tombol font-bold p-6"
          >
            <span className="me-1 mb-3">KONFIRMASI</span>
          </button>
          {isUploading && (
            <div className="radial-progress" style={{ "--value": progress }}>
              {progress}%
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Konfirmasi;
