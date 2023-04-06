import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import { getEventData } from "./utils/actions";
import Event from "./pages/Event";
import Konfirmasi from "./pages/Konfirmasi";

// const Routes = [
//   {
//     path: '/',
//     element: <Home />,
//     loader: getEventData,
//   },

//   {
//     path: '/tiket',
//     element: <Home />,
//   },
//   {
//     path: '/transaksi',
//     element: <Home />,
//   },
//   {
//     path: '/event/:eventId',
//     element: <Event />,
//   }
// ]

// const Router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: Routes.map(route => ({
//       index: route.path === '/',
//       path: route.path,
//       element: route.element,
//       loader: route.loader ? route.loader : null,
//     }))
//   }
// ])

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} loader={getEventData} />
      <Route path="/konfirmasi-tiket" element={<Konfirmasi />} />
      <Route path="/transaksi" element={<Home />} />
      <Route path="/event/:eventId" element={<Event />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
