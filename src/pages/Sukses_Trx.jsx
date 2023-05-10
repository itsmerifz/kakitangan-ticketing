import React from 'react'
import { useRecoilState } from 'recoil'
import { jenisTrxState, totalHargaState, kodeTrxState } from '../utils/atoms'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import QRIS from '../assets/img/qris.webp'

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const Sukses_Trx = () => {
  const [fixedJenisPembayaran, setFixedJenisPembayaran] = useRecoilState(jenisTrxState)
  const [totalHarga, setTotalHarga] = useRecoilState(totalHargaState)
  const [kodeTransaksi, setKodeTransaksi] = useRecoilState(kodeTrxState)

  return (
    <React.Fragment>
      <Helmet>
        <title>KKTNGN | MAKASE ! &lt;3</title>
      </Helmet>
      <div className='p-4 mx-auto mt-5'>
        <h1 className='mx-auto font-pixel_bold text-center'>MAKASE ! &lt;3 </h1>
        <div className='w-full bg-slate-400 p-4 box-konfirmasi mb-12'>
          <h2 className='m-0 p-3 border-b-2 border-current text-center'>Transaksi Kamu Berhasil</h2>
          {
            fixedJenisPembayaran !== 'transfer' ? <CODLayout kode={kodeTransaksi} harga={totalHarga}/> : <TransferLayout harga={totalHarga}/>
          }
        </div>
      </div>
    </React.Fragment>
  )
}

const TransferLayout = ({ harga }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p>Silahkan melakukan pembayaran sebesar <span className='font-extrabold underline'>{rupiah.format(harga)}</span> ke:</p>
      <h3 className='m-0 mb-4 text-center lg:text-2xl text-base'>BANK BRI: 7854-0100-4239-538 <br />a.n. : Maryam Anggun Hiola</h3>
      <h3>ATAU</h3>
      <h2 className='m-0 mb-4 text-center lg:text-2xl text-base'> QRIS KAKITANGAN</h2>
      <img src={QRIS} className='rounded-xl' width={250} alt="QRIS KKTNGN" />
      <p>Setelah melakukan pembayaran, silahkan upload bukti pembayaran di halaman <Link to={'/konfirmasi-tiket'}>Konfirmasi Tiket</Link>.</p>
      <h4 className='m-0 mb-2 font-black px-3'>JANGAN MELAKUKAN TRANSAKSI SELAIN QR DIATAS!</h4>
    </div>
  )
}

const CODLayout = ({ harga, kode }) => {
  const handleWhatsapp = () => {
    let text = `Halo kak, mau COD tiket bahas bahasa dengan kode ${kode} ${rupiah.format(harga)} bagaimana kak? Terima kasih.`
    return window.open(`https://wa.me/6289676452388?text=${text}`, '_blank')
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <p>Silahkan klik tombol dibawah ini: </p>
      <button className='tombol w-full h-24 font-pixel_bold' onClick={handleWhatsapp}>WHATSAPP</button>
      <h4 className='m-0 my-5 font-black px-3'>JANGAN MELAKUKAN TRANSAKSI KE NOMOR SELAIN DIATAS!</h4>
    </div>
  )
}

export default Sukses_Trx