"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <RotatingLines
        visible={true}
        width="96" // width should be a number, not a string
        strokeWidth="5" // strokeWidth should be a number, not a string
        animationDuration="0.75" // this should be a string
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loading;
