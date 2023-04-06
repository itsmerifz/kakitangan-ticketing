import React from "react";
const Layout = React.lazy(() => import("./components/Layouts"));
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <React.Suspense fallback={<Loader/>}>
      <Layout>
        <Navbar>
          <Outlet />
        </Navbar>
      </Layout>
    </React.Suspense>
  );
};

export default App;
