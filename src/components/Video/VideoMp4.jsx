//-------------------------------------------------------------------------//
//                                                                         //
// videoMp4.jsx                                                            //
//                                                                         //
// This source code is made freely available for                           //
// possible modification and redistribution.                               //   
//                                                                         //
// But, You should always ask for consent before sharing a photo or video. //
// please send email to kcjin000@gmail.com                                 //
//                                                                         //
//-------------------------------------------------------------------------//
import   React, { 
         useState, 
         Suspense }        from "react";
import { useVideoTexture, 
         useTexture }      from '@react-three/drei'
		 
		 
import * as THREE from 'three'
import  { useEffect} from 'react'


const    _var      =   require('../var/var.js');

// kitech_5min_c.mp4 is more compressed then in comparison with original to speed up..
//{(isClicked===false) ? [-4.5, 1.9, 0] : [-5.5, 1.9, 0]}
export const VideoMp4 = () => {

	const [isClicked, setClicked] = useState(false);

    return (

        <mesh 
		    position = {(isClicked===true) ? [-3.2, 2.2, 0] : [-5.5, 1.9, 0]}
		    rotation = {[ 0, 1.6, 0]}
			
		    onClick={(e) => {
			   e.stopPropagation();			   
			   if (!isClicked) {
				  setClicked(true);
			      _var.clk0 = 100; 
			      _var.clk1 = 1;
			   }  else {
				  setClicked(false);
			      _var.clk0 = 100; 
			      _var.clk1 = 2;
			   }			   
			   console.log('Promotional Video'); 
            }}>
			
            <planeGeometry args={[6.5, 3.2]} />
            <Suspense fallback={null}>
                <VideoText muted={!isClicked} url= "./assets/video/kitech_5min_640x360.mp4" />
            </Suspense>		
        </mesh>
    )
}


function VideoText({ clicked, url }) {
	
  const [video] = useState(() => 
      Object.assign(document.createElement('video'), 
	  { src: url, 
	    crossOrigin: 'Anonymous', 
	    loop: false, 
		muted: clicked,
	   }))
	  

	  if(_var.clk0 === 100 && _var.clk1 === 1)
	  {
	        console.log("mp4 clicked");      
	        video.play(); 
	  }
	  if(_var.clk0 === 100 && _var.clk1 === 2)
	  { 
            console.log("mp4 not clicked"); 
			video.pause(); 
	  }
	 
     return (
       <meshBasicMaterial toneMapped={false}>
         <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
       </meshBasicMaterial>
  )
}

//
//  useEffect( () => 
///   { 
//    if(!clicked) { console.log("clicked");   void video.play(); }
//    else         ( console.log("not clicked"); void video.pause(); }
//   }, [video])
 