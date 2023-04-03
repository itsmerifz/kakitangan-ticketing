import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="flex flex-col gap-5 dropdown-content mt-3 p-2 shadow bg-base-100 w-52 border-2 border-black"
          >
            <a className="hover:border-2 border-black" href="#">Beranda</a>
            <a className="hover:border-2 border-black" href="#">Tiket</a>
            <a className="hover:border-2 border-black" href="#">Login</a>
          </ul>
        </div>
        <h3 className="p-2 m-0 z-40">KKTNGN</h3>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="flex gap-5 px-2">
          <a className="border-2 border-transparent hover:border-black p-1" href="#">Beranda</a>
          <a className="border-2 border-transparent hover:border-black p-1" href="#">Tiket</a>
          <a className="border-2 border-transparent hover:border-black p-1" href="#">Login</a>
        </ul>
      </div>
    </nav>
  );
};

const ChangeBackground = () => {
  if(window.scrollY >= 77){
    document.querySelector('.navbar').classList.add('bg-transparent');
    document.querySelector('.navbar').classList.remove('bg-base-100');
  }
}

export default Navbar;
