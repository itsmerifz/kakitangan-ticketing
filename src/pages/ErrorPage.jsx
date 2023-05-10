import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet";
import Logo from "../assets/img/logo.webp";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Helmet>
        <title>KKTNGN | ERROR</title>
      </Helmet>
      <div id="error-page" className="min-h-screen flex flex-col gap-7 justify-center items-center">
        <h1 className="text-5xl font-black font">WADUH!</h1>
        <h3 className="text-2xl">Ada kesalahan halaman</h3>
        <h4 className="text-xl">Kalo nyasar, tinggal <Link to={'/'} className="underline">klik ini</Link>.</h4>
        <h6 className="text-sm">{error.statusText || error.message}</h6>
        <img src={Logo} alt="Logo" className="w-32 mt-8" />
      </div>
    </>
  );
};

export default ErrorPage;
