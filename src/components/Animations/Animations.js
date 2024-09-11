//-------------------------------------------------------------------------//
//                                                                         //
// animation.js                                                            //
//                                                                         //
// This source code is made freely available for                           //
// possible modification and redistribution.                               //   
//                                                                         //
// please ref to https://github.com/drissbenadjal/expo-interactive         //
//                                                                         //
// But, You should always ask for consent before sharing a photo or video. //
// please send email to kcjin000@gmail.com                 ,               //
//                                                                         //
//-------------------------------------------------------------------------//

import { gsap } from "gsap";

export const zoom = (target, x, y, z) => {
  gsap.to(target, { x: x, y: y, z: z });
};

export const rotate = (target, x, y, z) => {
  gsap.to(target, { x: x, y: y, z: z });
};

export const zoomVR = (target, x, y, z) => {
  const duration = 500;
  const framesNumber = 60;

  const xStep = (x - target.scene.position.x) / framesNumber;
  const yStep = (y - target.scene.position.y) / framesNumber;
  const zStep = (z - target.scene.position.z) / framesNumber;

  for (let i = 0; i < framesNumber; i++) {
    setTimeout(() => {
      target.scene.position.x += xStep;
      target.scene.position.y += yStep;
      target.scene.position.z += zStep;
    }, (i * duration) / framesNumber);
  }
  return;
};

export const rotateVR = (target, x, y, z) => {
  const duration = 500;
  const framesNumber = 60;

  const xStep = (x - target.scene.rotation.x) / framesNumber;
  const yStep = (y - target.scene.rotation.y) / framesNumber;
  const zStep = (z - target.scene.rotation.z) / framesNumber;

  for (let i = 0; i < framesNumber; i++) {
    setTimeout(() => {
      target.scene.rotation.x += xStep;
      target.scene.rotation.y += yStep;
      target.scene.rotation.z += zStep;
    }, (i * duration) / framesNumber);
  }

  return;
};
