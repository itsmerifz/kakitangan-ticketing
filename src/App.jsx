import React from "react";
const Layout = React.lazy(() => import("./components/Layouts"));
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";

const App = () => {
  return (
    <React.Suspense fallback={<Loader/>}>
      <Layout>
        <Navbar />
        <Home />
      </Layout>
    </React.Suspense>
  );
};

export default App;
