//-------------------------------------------------------------------------//
//                                                                         //
// Paint.jsx                                                               //
//                                                                         //
// This source code is made freely available for                           //
// possible modification and redistribution.                               //   
//                                                                         //
// please refer to https://github.com/drissbenadjal/expo-interactive       //
//                                                                         //
// But, You should always ask for consent before sharing a photo or video. //
// please send email to kcjin000@gmail.com                                 //
//                                                                         //
//-------------------------------------------------------------------------//

import { useState }       from "react";
import { Interactive }    from "@react-three/xr";
import { zoom, rotate, zoomVR, 
         rotateVR }       from "../Animations/Animations";

const  _var = require('../var/var.js');

export const Paint = ({
  index,	
  name,
  basePosition,
  baseRotation,
  hoverPosition,
  clickPosition,
  clickRotation,
  baseScale,
  paint,
}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setClicked]   = useState(false);
  
  return (
    <Interactive
      onHover={() => {
        if (!isHovered) {
          setIsHovered(true);
          zoomVR(paint, hoverPosition.x, hoverPosition.y, hoverPosition.z);
		  console.log('onHover',_var.clk0,_var.clk1);
        }
      }}
      onBlur={() => {
        if (isHovered) {
          setIsHovered(false);
          //sound.pause();
          zoomVR(  paint, basePosition.x, basePosition.y, basePosition.z);
          rotateVR(paint, baseRotation.x, baseRotation.y, baseRotation.z);
		  console.log('onBlur',_var.clk0,_var.clk1);
        }
      }}
      onSelect={() => {
        rotateVR(paint, clickRotation.x, clickRotation.y, clickRotation.z);
        zoomVR(  paint, clickPosition.x, clickPosition.y, clickPosition.z);
        //sound.play();
		console.log('onSelect',_var.clk0,_var.clk1);
      }}
    >
      <primitive
        object={paint.scene}
        scale={baseScale}
        position={[basePosition.x, basePosition.y, basePosition.z]}
        rotation={[baseRotation.x, baseRotation.y, baseRotation.z]}
        onPointerOver={(event) => {
	      zoom(
            paint.scene.position,
            hoverPosition.x,
            hoverPosition.y,
            hoverPosition.z
          );
		  //console.log('onPointerOver',_var.clk0,_var.clk1);
        }}
        onPointerOut={(event) => {
		  //setClicked(false);	
          //sound.pause();
          zoom(
            paint.scene.position,
            basePosition.x,
            basePosition.y,
            basePosition.z
          );
          rotate(
            paint.scene.rotation,
            baseRotation.x,
            baseRotation.y,
            baseRotation.z
          );
		  // setClicked(false);
		  //console.log('onPointerOut',_var.clk0,_var.clk1);
        }}
        onClick={(event) => {
		  if (!isClicked) {
              rotate(
              paint.scene.rotation,
              clickRotation.x,
              clickRotation.y,
              clickRotation.z
            );
            zoom(
              paint.scene.position,
              clickPosition.x,
              clickPosition.y,
              clickPosition.z
            );
            //sound.play();
			_var.clk0 = index;
			_var.clk1 = 1;
			console.log('onClicked ON',_var.clk0,_var.clk1);
            
			setClicked(true);
			//event.stopPropagation();
		  }
		  else {			
			//sound.stop();
            zoom(
              paint.scene.position,
              basePosition.x,
              basePosition.y,
              basePosition.z
            );
            rotate(
              paint.scene.rotation,
              baseRotation.x,
              baseRotation.y,
              baseRotation.z
            );
			
			_var.clk0 = index;
			_var.clk1 = 2;
			console.log('onClicked OFF',_var.clk0,_var.clk1);
			
			setClicked(false);	
            event.stopPropagation();			
		  }
        }}
      />
    </Interactive>
  );
};
