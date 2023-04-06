import React from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import Loader from "../components/Loader";
import { getEventDetail } from "../utils/actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(true);

  if (!cookies.get("user")) {
    alert("Login dlu y mniezzz");
    return <Navigate to={'/'}/>;
  }

  React.useEffect(() => {
    getEventDetail(eventId).then((res) => {
      setEvent(res);
    });
  });

  return <React.Fragment>asjaisajisajsa</React.Fragment>;
};

export default Event;
