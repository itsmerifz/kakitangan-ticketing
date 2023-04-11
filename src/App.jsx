import React from "react";
const Layout = React.lazy(() => import("./components/Layouts"));
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import './App.css'

const App = () => {
  return (
    <React.Suspense fallback={<Loader/>}>
      <Layout>
        <Navbar>
          <Outlet />
          <Footer />
        </Navbar>
      </Layout>
    </React.Suspense>
  );
};

const Footer = () => {
  return (
    <footer className="p-3 border-t-2 footer border-current footer-center">
      &copy; {new Date().getFullYear()} - KKTNGN
    </footer>
  );
};

export default App;
