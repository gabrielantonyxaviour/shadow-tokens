"use client";
import React, { useEffect, useState } from "react";
import Collection from "./Collection";

const Wrapper = () => {
  const [windowEth, setWindowEth] = useState(null);
  useEffect(() => {
    const { ethereum } = window;
    setWindowEth(ethereum);
  }, [windowEth]);
  return <>{windowEth !== null ? <Collection ethereum={windowEth} /> : null}</>;
};

export default Wrapper;
