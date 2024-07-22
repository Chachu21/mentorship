"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <RotatingLines
        visible={true}
        width={"96"} // width should be a number
        strokeWidth={"3"} // strokeWidth should be a number
        animationDuration="0.75s" // this should be a string and include the unit
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loading;
