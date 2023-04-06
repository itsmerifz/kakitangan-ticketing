import React from "react";
import { Link } from "react-router-dom";
import { logOut, loginWithGoogle } from "../utils/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Navbar = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (user){
    cookies.set('user', user.uid);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    alert(error);
  }

  return (
    <nav className={`drawer z-40`}>
      <input type="checkbox" className="drawer-toggle" id="drawer-nav" />
      <div className="drawer-content flex flex-col">
        {/* NAVBAR */}
        <NavbarDesktop user={user} />
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-nav" className="drawer-overlay"></label>
        <ul className="flex flex-col justify-start items-center p-4 w-80 bg-base-300">
          {user ? (
            <React.Fragment>
              <p className="border-b border-current p-0 m-0 mb-4">
                Halo, {user.displayName}!
              </p>
              <Link
                className="border-2 border-transparent hover:border-black p-1"
                to="/"
              >
                Beranda
              </Link>
              <Link
                className="border-2 border-transparent hover:border-black p-1"
                to="konfirmasi-tiket"
              >
                Konfirmasi Tiket
              </Link>
              <button
                className="border-2 border-transparent hover:border-black underline text-[#5b4000] p-1"
                onClick={logOut}
              >
                Logout
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                className="border-2 border-transparent hover:border-black p-1"
                to="/"
              >
                Beranda
              </Link>
              <button
                className="border-2 border-transparent hover:border-black underline text-[#5b4000] p-1"
                onClick={loginWithGoogle}
              >
                Login
              </button>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

const NavbarDesktop = ({ user }) => {
  const [navbarBg, setNavbarBg] = React.useState(true);

  const ChangeBackground = () => {
    if (window.scrollY > 10) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", ChangeBackground);
  });

  return (
    <div
      className={`w-full navbar transition-colors duration-500 sticky top-0  ${
        navbarBg ? "bg-base-300" : "bg-transparent"
      }`}
    >
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-nav" className="btn btn-ghost drawer-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">
        <Link to="/" className="w-24">
          <img
            src="/src/assets/img/logo.webp"
            className="m-0"
            alt="Logo KKTNGN"
          />
        </Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="flex gap-5 px-2 m-0">
          {user ? (
            <React.Fragment>
              <Link
                className="border-2 border-transparent hover:border-black p-1"
                to="/"
              >
                Beranda
              </Link>
              <Link
                className="border-2 border-transparent hover:border-black p-1"
                to="/konfirmasi-tiket"
              >
                Konfirmasi Tiket
              </Link>
              <button
                className="border-2 border-transparent hover:border-black underline text-[#5b4000] p-1"
                onClick={logOut}
              >
                Logout
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <a
                className="border-2 border-transparent hover:border-black p-1"
                href="#"
              >
                Beranda
              </a>
              <button
                className="border-2 border-transparent hover:border-black underline text-[#5b4000] p-1"
                onClick={loginWithGoogle}
              >
                Login
              </button>
            </React.Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
