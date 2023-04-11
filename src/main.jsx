import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import { getEventData } from "./utils/actions";
import Event from "./pages/Event";
import Konfirmasi from "./pages/Konfirmasi";
import Sukses_Trx from "./pages/Sukses_Trx";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} loader={getEventData} />
      <Route path="/konfirmasi-tiket" element={<Konfirmasi />} />
      <Route path="/transaksi" element={<Home />} />
      <Route path="/event/:eventId" element={<Event />} />
      <Route path="/success" element={<Sukses_Trx />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={Router} />
    </RecoilRoot>
  </React.StrictMode>
);
