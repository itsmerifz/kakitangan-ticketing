import React from "react";
import { RotateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <RotateLoader color="#5b4000" />
      </div>
    </div>
  );
};

export default Loader;
