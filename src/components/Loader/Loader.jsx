//-------------------------------------------------------------------------//
//                                                                         //
// Loader.jsx                                                              //
//                                                                         //
// This source code is made freely available for                           //
// possible modification and redistribution.                               //   
//                                                                         //
// please ref to https://github.com/drissbenadjal/expo-interactive         //
//                                                                         //
// But, You should always ask for consent before sharing a photo or video. //
// please send email to kcjin000@gmail.com                                 //
//                                                                         //
//-------------------------------------------------------------------------//

import React, { useState, useEffect, useRef } from "react";
import "./Loader.css";

export const Loader = ({ loading }) => {
	
  const [display, setDisplay] = useState(true);
  const loaderTopRef          = useRef(null);
  const loaderBottomRef       = useRef(null);
  const loadingTextRef        = useRef(null);
  const dotRef                = useRef(null);

  useEffect(() => {
    let dot = window.setInterval(() => {
      if (dotRef.current.innerHTML.length > 2) dotRef.current.innerHTML = "";
      else dotRef.current.innerHTML += ".";
    }, 500);

    if (!loading) {
      loadingTextRef.current.style.opacity = 0;
      clearInterval(dot);

      for (let i = 0; i < 51; i++) {
        setTimeout(() => {
          loaderTopRef.current.style.height = `${50 - i}vh`;
        }, i * 6);
      }
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          loaderBottomRef.current.style.height = `${50 - i}vh`;
        }, i * 6);
      }

      setTimeout(() => {
        setDisplay(false);
      }, 500);
    }

    return () => {
      clearInterval(dot);
    }

  }, [loading]);

  if (display) {
    return (
      <div className="loader">
        <div className="loader__top" ref={loaderTopRef}>
          <img src="./assets/Images/Logo-top.webp" alt="" />
        </div>
        <div className="loader__bottom" ref={loaderBottomRef}>
          <img src="./assets/Images/Logo-bottom.webp" alt="" />
        </div>
        <p className="loading" ref={loadingTextRef}>
          Loading <span ref={dotRef}></span>
        </p>
      </div>
    );
  } else {
    return null;
  }
};
