//-------------------------------------------------------------------------//
//                                                                         //
// Gallery.jsx                                                             //
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

import React from "react";

export const Gallery = ({ modele }) => {
  return (
    <>
      <primitive
        object={modele.scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 3.15, 0]}
      />
    </>
  );
};
