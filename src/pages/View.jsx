//-------------------------------------------------------------------------//
//                                                                         //
// View.jsx                                                                //
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

import                             "../index.css";
import { useGLTF, OrbitControls, Text,
         useTexture, Text3D } from "@react-three/drei";
import   React, { 
         useRef, useState, 
         useEffect }          from "react";
import { Canvas,  useThree }  from "@react-three/fiber";
import { XR }                 from "@react-three/xr";
import { Vector2, Texture,
         Audio, AudioListener,
		 AudioLoader, MeshMatcapMaterial,
		 PCFSoftShadowMap }   from "three";
//import * as THREE             from "three";
import { Mobile }             from "../components/Mobile/Mobile";
import { Loader }             from "../components/Loader/Loader";
import { Gallery }            from "../components/Gallery/Gallery";
import { CrossHair }          from "../components/CrossHair/CrossHair";
import { Paint }              from "../components/Paint/Paint";
import { Sky }                from "../components/Sky/Sky";
import { VideoMp4 }           from "../components/Video/VideoMp4";
import { Html }               from "@react-three/drei";
import { createGlobalState }  from "react-hooks-global-state";

const    initialState      =  { albumIndex: 0, stopRotate: false }
const  { useGlobalState }  =    createGlobalState(initialState);
const    _var              =    require('../components/var/var.js');

//---- for shaderMaterial, define vertex and fragment shader ---------------------
var imageCoverVertexShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
  `;

var imageCoverFragmentShader = `
  uniform sampler2D uTexture;

  uniform float uScaleFactorX;
  uniform float uScaleFactorY;

  varying vec2 vUv;

  void main() {
    vec2 st = (vUv * 2.0 - 1.0);
    st.x *= uScaleFactorX;
    st.y *= uScaleFactorY;
    st = st * 0.5 + 0.5;
    gl_FragColor = texture(uTexture, st );
  }
  `;
  
//--- calculate scale value and scaleF is added --------------------------------
const calculateScaleFactors = (texture:        Texture, 
                               containerSize:  Vector2, 
                               scaleF:         Vector2) => {

  const containerAspectRatio = containerSize.x / containerSize.y;
  const imageAspectRatio     = texture.image.width / texture.image.height;

  let scaleFactorX = scaleF.x;
  let scaleFactorY = scaleF.y;

  const landscapeFactor          = imageAspectRatio / containerAspectRatio;
  const portraitFactor           = containerAspectRatio / imageAspectRatio;
  const isLandscapeModeContainer = containerAspectRatio >= 1;
  const isContainerRatioStronger = containerAspectRatio >= imageAspectRatio;

  if (isContainerRatioStronger) {
    scaleFactorY = isLandscapeModeContainer ? landscapeFactor : portraitFactor;
  } else {
    scaleFactorX = isLandscapeModeContainer ? landscapeFactor : portraitFactor;
  }

  return {scaleFactorX, scaleFactorY}
}

//--- generate all image mesh  ------------------------------------------        
function GenerateGalleryAll(textures:          Texture[], 
                            galleryDimension:  Vector2) {
  
  const [activeIndex, setActiveIndex] = useState('');
  const [albumIndex, setAlbumIndex]   = useGlobalState('albumIndex');
  const scaleF                        = new  Vector2(1.0, 1.0);
  
  return textures.map((texture, index) => {

    const {scaleFactorX, scaleFactorY} = calculateScaleFactors(texture, galleryDimension, scaleF);
    const uniforms = {
      uTexture: {
        value: texture
      },
      uScaleFactorX: {
        value: scaleFactorX
      },
      uScaleFactorY: {
        value: scaleFactorY
      }
    }
    return <mesh 
         key={`plane${index}`} 
         position={[parseInt(index%10)*0.9-4, 3.0-parseInt(index/10)*0.8, -4.5]}
         scale={index===activeIndex ? 1:1}
         onClick={(e) => {
			albumIndex !== 0 ? setAlbumIndex(0) : setAlbumIndex(index+1)
			_var.clk0 = 11+index;
			_var.clk1 = 1;
			setActiveIndex(index);
			e.stopPropagation();
			console.log('checked:', albumIndex); 
         }}>
        <planeGeometry args={[galleryDimension.x, galleryDimension.y]}/>
        <shaderMaterial 
           vertexShader={imageCoverVertexShader} 
           fragmentShader={imageCoverFragmentShader}
           uniforms={uniforms}/>
     </mesh>
  });
}

//---generate mesh to show selected image  ------------------------------------------
function GenerateGalleryOne(textures:  Texture[]) {
  
  const [albumIndex, setAlbumIndex] = useGlobalState('albumIndex');
  const xyImg = new  Vector2(0.0, 0.0);
  const xyCof = new  Vector2(0.0, 0.0);
  const xyDiv = new  Vector2(0.0, 0.0);
  const xyD   = new  Vector2(0.0, 0.0);
  const xyS   = new  Vector2(0.0, 0.0);
	
  return textures.map((texture, index) => {

     // console.log('x:', texture.image.height, ' y:', texture.image.width);
    xyImg.x = texture.image.width;             
	xyImg.y = texture.image.height;
    xyCof.x = 9.0;              xyCof.y = 6.0;
	xyDiv.x = xyImg.x/xyCof.x;  xyDiv.y = xyImg.y/xyCof.y;
	xyD.x   = xyImg.x/xyDiv.x;    xyD.y = xyImg.y/xyDiv.x;
	xyS.x   = 1;                  xyS.y = 1;
	
    const {scaleFactorX, scaleFactorY} = calculateScaleFactors(texture, xyD, xyS);
    const uniforms = {
      uTexture: {
        value: texture
      },
      uScaleFactorX: {
        value: scaleFactorX
      },
      uScaleFactorY: {
        value: scaleFactorY
      }
    }
    return <mesh 
         key={`plane${index}`} 
         position={[0, 2.3, -4]}
		 scale={albumIndex === (index+1) ? 1: 0}
         onClick={(e) => {
			setAlbumIndex(0);                //  not clicked.
			e.stopPropagation();
			_var.clk0 = 11+index; 
			_var.clk1 = 2;
			console.log('To turn off figure:', albumIndex); 
         }}>
        <planeGeometry args={[xyD.x, xyD.y]}/>
        <shaderMaterial 
           vertexShader={imageCoverVertexShader} 
           fragmentShader={imageCoverFragmentShader}
           uniforms={uniforms}/>
     </mesh>
  });
}

// 1 + 28 kitech history image sets 
const History = ({index}) => {
  const textures = useTexture([
    "./assets/kitech_history/01_1900_00.jpg",
    "./assets/kitech_history/01_1989_00.jpg",
    "./assets/kitech_history/01_1990_00.jpg",
    "./assets/kitech_history/01_1997_00.jpg",
    "./assets/kitech_history/01_1997_01.jpg",
    "./assets/kitech_history/02_2000_00.jpg",
    "./assets/kitech_history/02_2000_01.jpg",
    "./assets/kitech_history/02_2002_00.jpg",
    "./assets/kitech_history/02_2002_01.jpg",
    "./assets/kitech_history/02_2003_00.jpg",
    "./assets/kitech_history/03_2004_00.jpg",
    "./assets/kitech_history/03_2004_01.jpg",
    "./assets/kitech_history/03_2005_00.jpg",
    "./assets/kitech_history/03_2006_00.jpg",
    "./assets/kitech_history/03_2006_01.jpg",
    "./assets/kitech_history/03_2006_02.jpg",
    "./assets/kitech_history/03_2006_03.jpg",
    "./assets/kitech_history/03_2007_00.jpg",
    "./assets/kitech_history/03_2008_00.jpg",
    "./assets/kitech_history/03_2008_01.jpg",
    "./assets/kitech_history/03_2009_00.jpg",
    "./assets/kitech_history/03_2009_01.jpg",
    "./assets/kitech_history/03_2009_02.jpg",
    "./assets/kitech_history/03_2012_00.jpg",
    "./assets/kitech_history/03_2012_01.jpg",
    "./assets/kitech_history/04_2014_00.jpg",
    "./assets/kitech_history/04_2016_00.jpg",
    "./assets/kitech_history/04_2018_00.jpg",
    "./assets/kitech_history/04_2019_00.jpg"
  ]);

  const landscapeContainer = new  Vector2(0.8, 0.7);
  const allMeshes          = GenerateGalleryAll(textures, landscapeContainer);
  const oneMeshes          = GenerateGalleryOne(textures);
  var   retMeshes          = allMeshes;
  
  if(index===0) retMeshes  = allMeshes;
  else          retMeshes  = oneMeshes;
  
  return <>
        {retMeshes}
  </>
}


//---show wall title  -------------------------------------------
function WallTitle() {
  const matcapTexture = new  MeshMatcapMaterial({ color: 0xFFFF8F });
  const ref = useRef();
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
            <Text3D
                position={[-3.5, 4.0, -4.9]}
                scale={[-1, 1, 1]}
		  	    rotation={[0, -3.130, 0]}
                ref={ref}
                size={0.5}
                maxWidth={[-w / 5, -h * 5, 5]}
                font={"./assets/fonts/Roboto Thin_Regular.json"} 
                curveSegments={12}
                brevelSegments={1}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.01}
                height={0.02}
                lineHeight={0.2}
                letterSpacing={0.1}
             >
              {`HISTORY ALBUM`}
              <meshMatcapMaterial color="white" matcap={matcapTexture} />
            </Text3D>
			
			<Text3D
                position={[5.95, 4.2, -3.6]}
                scale={[-1, 1, 1]}
		  	    rotation={[0, 1.58, 0]}
                ref={ref}
                size={0.5}
                maxWidth={[-w / 5, -h * 5, 5]}
                font={"./assets/fonts/Roboto Thin_Regular.json"} 
                curveSegments={12}
                brevelSegments={1}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.01}
                height={0.02}
                lineHeight={0.2}
                letterSpacing={0.05}
             >
              {`DIRECTOR MESSAGE`}
              <meshMatcapMaterial color="white" matcap={matcapTexture} />
            </Text3D>
			
			 <Text3D
                position={[3.0, 4.0, 4.8]}
                scale={[-1, 1, 1]}
		  	    rotation={[0, 0, 0]}
                ref={ref}
                size={0.5}
                maxWidth={[-w / 5, -h * 4, 5]}
                font={"./assets/fonts/Roboto Thin_Regular.json"} 
                curveSegments={12}
                brevelSegments={1}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.005}
                height={0.02}
                lineHeight={0.1}
                letterSpacing={0.05}
             >
              {`DIGITAL SIGNAGE`}
              <meshMatcapMaterial color="white" matcap={matcapTexture} />
            </Text3D>
			
			<Text3D
                position={[-5.95, 4.1, 3.9]}
                scale={[-1, 1, 1]}
		  	    rotation={[0, -1.56, 0]}
                ref={ref}
                size={0.5}
                maxWidth={[-w / 5, -h * 5, 5]}
                font={"./assets/fonts/Roboto Thin_Regular.json"} 
                curveSegments={12}
                brevelSegments={1}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.01}
                height={0.02}
                lineHeight={0.2}
                letterSpacing={0.05}
             >
              {`PROMOTIONAL VIDEO`}
              <meshMatcapMaterial color="white" matcap={matcapTexture} />
            </Text3D>
			
			
    </>
  );
}

//--- show board message ---------------------------------------------------
function Board2Text() {	
  return (
    <>
	        <Text
			    position={[2.5, 0.9, 2]}
                scale={(_var.board===2) ? [0.15,0.15,0.15] : [0, 0, 0]}
		  	    rotation={[0, 3.8, 0]}
				color="white"
                outlineColor="black"
				outlineWidth={0.1}
				lineHeight={0.7}
             >			 
              {`KITECH is spearheading the creation of new value through:
			  \n
			  \n1. Establishing an autonomous manufacturing system
              \n    to enhance customer value
			  \n2. Expanding the manufacturing industry business model 
			  \n    to amplify added value
			  \n3. Contributing to the realization of the hydrogen economy 
			  \n    and carbon neutrality`}
			  
            </Text>

    </>
  );
}

//--- show board message ---------------------------------------------------
function Board3Text() {
  return (
    <>
	        <Text
			    position={[-0.5, 0.9, 3.0]}
                scale={(_var.board===3) ? [0.15,0.15,0.15] : [0, 0, 0]}
		  	    rotation={[0, 3.15, 0]}
				color="white"
                outlineColor="black"
				outlineWidth={0.1}
				lineHeight={0.8}
             >			 
              {`KITECH is advancing toward the grand transformation
			  \nin production technology. Aiming to revitalize
			  \ndomastic industries facing growth limits,
			  \nKITECH drives value enhancement with the manufacturing sector.
			  \nLeveraging its expertise and network,
			  \nKITECH is committed to realizing its new vision.`}
            </Text>
    </>
  );
}

//--- show board message ---------------------------------------------------
function Board4Text() {
  return (
    <>
	        <Text
			    position={[-1.8, 1.5, 2.0]}
                scale={(_var.board===4) ? [0.2,0.2,0.2] : [0, 0, 0]}
		  	    rotation={[0, 2.5, 0]}
				color="white"
                outlineColor="black"
				outlineWidth={0.1}
				lineHeight={0.8}
             >			 
              {`KITECH implements digital production processes,
			  \nembraces circular economy principles, and
			  \ndeploys next-generation safely controls to
			  \nharness sustainable energy and address climate change.
			  \n
			  \nKeywords: Zero Carbon Emission, Green Transformation`}
            </Text>
    </>
  );
}

//--- show board message ---------------------------------------------------
function Board5Text() {
  return (
    <>
            <Text
			    position={[-3.0, 1.5, 0]}
                scale={(_var.board===5) ? [0.2, 0.2, 0.2] : [0, 0, 0]}
		  	    rotation={[0, -4.7, 0]}
				color="white"
                outlineColor="black"
				outlineWidth={0.1}
				lineHeight={0.7}
             >			 
              {`한국생산기술연구원은 
			  \n생산기술 대전환을 향해 나아갑니다. 
			  \n성장 한계에 직면한 국내 산업의 재도약을 위해
			  \n제조 산업의 가치 고도화를 추진합니다. 
			  \n우리가 보유한 전문성과 네트워크를 바탕으로
			  \n새로운 비전을 실현하겠습니다`}
            </Text>
    </>
  );
}


//--- main view routine ---------------------------------------------------
export const View = () => {

  const [device,    setDevice]   = useState("");
  const [loading,   setLoading]  = useState(true);
  const [landPort,  setLandPort] = useState(false);  
  const [albumIndex,setAlbumIndex]  = useGlobalState('albumIndex');
  const [stopRotate, setStopRotate]  = useGlobalState('stopRotate');
  
  console.log('_vars:', _var.clk0, _var.clk1);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setDevice("desktop");
    } else {
      setDevice("desktop");
    }
	
	const isAndroid = /(android)/i.test(navigator.userAgent);
    if (isAndroid) 
	{
       //if(screen.width < screen.height) {  // portrait mode
	   if(window.innerWidth < window.innerHeight) {  // portrait mode
	       setLandPort(true);
	   }
    } else {       
	   if(window.orientation  === 0) {  // portrait mode in IOS
	       setLandPort(true);
	   }
    }
	
  }, []);

  const gallery    = useGLTF(`./assets/modeles/vr_gallery/scene.gltf`);
  const kitechdm00 = useGLTF(`./assets/textures/kitechdm00.glb`);
  const kitechcr00 = useGLTF(`./assets/textures/kitechcr00.glb`);
  const kitechcr01 = useGLTF(`./assets/textures/kitechcr01.glb`);
  const kitechcr02 = useGLTF(`./assets/textures/kitechcr02.glb`);
  const sky        = useGLTF(`./assets/textures/sky.glb`);

  //check event
  useEffect(() => {	     
	
	const listener    = new  AudioListener();
	const sound       = new  Audio(listener);
	const audioLoader = new  AudioLoader();
	audioLoader.load(`./assets/sounds/ambiance.mp3`, function(buffer) {
		   sound.setBuffer(buffer);
		   sound.onEnded=()=> {
		       sound.isPlaying = false;
			   sound.pause();
			   console.log("Audio sound.pause");	
			   //sound.isPlaying = true;
			   //sound.play();
			   //console.log("Audio sound.play");				   
		   }
		   console.log("Audio load");	
	});
	
    window.addEventListener("click", () => {
	  console.log("EventListener");
	
   	  if(!sound.isPlaying) {
	      console.log("sound.play.");
		  //sound.volume = 0.001;
   	      sound.play();
	  }
	  
	  if (_var.clk0        === 1  && _var.clk1 === 1) {
          _var.board=1;
		  setStopRotate(true);
	  } else if (_var.clk0 === 2  && _var.clk1 === 1) {
          _var.board=2;
		  setStopRotate(true);
	  } else if (_var.clk0 === 3  && _var.clk1 === 1) {
          _var.board=3;
		  setStopRotate(true);
	  } else if (_var.clk0 === 4  && _var.clk1 === 1) {
          _var.board=4;
		  setStopRotate(true);
	  } else if (_var.clk0 === 5  && _var.clk1 === 1) {
          _var.board=5;
		  setStopRotate(true);
	  } else if (_var.clk0 === 11  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 12  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 13  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 14  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 15  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 16  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 17  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 18  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 19  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 20  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 21  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 22  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 23  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 24  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 25  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 26  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 27  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 28  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 29  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 30  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 31  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 32  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 33  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 34  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 35  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 36  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 37  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 38  && _var.clk1 === 1) { setStopRotate(true);
    } else if (_var.clk0 === 39  && _var.clk1 === 1) { setStopRotate(true);
	  } else if (_var.clk0 === 100 && _var.clk1 === 1) { 
	      setStopRotate(true); 
	      sound.pause();
	  } else  {
		  _var.board=0;
		  setStopRotate(false);  // moving 
	  } 
	  
    });

    return () => {
	    window.removeEventListener("click", () => {
          //audioambiance.play();
          //audioambiance.volume = 0.08;
          //audioambiance.loop   = true;
      });
    };
  }, []);


  useEffect(() => {
    if (device === "desktop") {
      if (
        gallery &&
        kitechdm00 &&
        kitechcr00 &&
        kitechcr01 &&
        kitechcr02 &&
        sky
      ) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, [
    device,
    gallery,
    kitechdm00,
    kitechcr00,
    kitechcr01,
    kitechcr02,
    sky,
  ]);

  // check whether mobile or desktop environment
  if (device === "mobile") {
    return (
      <Mobile />
    );
  } 
  else if (device === "desktop") {
    return (
      <>
        <Loader loading={loading} />
        <CrossHair />
        <Canvas
          gl={{ antialias: true }}
          camera={{ position: [-4, 1.5, 0], fov: 60, rotation: [0, 4, 0] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type    = PCFSoftShadowMap;
          }}
          style={{ width: "100vw", height: "100vh" }}
        >
		
          <OrbitControls 
		     autoRotate      = { (stopRotate===false)? true: false }
             enablePan       = { false }
             minPolarAngle   = { Math.PI/6} 
             maxPolarAngle   = { Math.PI - Math.PI/6} 
             minDistance     = { 0.2 }
             maxDistance     = { 3.0 }
             target={[0, 1.5, 0]}/>

          <XR
            frameRate={72 | 90 | 120}
            sessionInit={{
              optionalFeatures: ["local-floor", "bounded-floor"],
              requiredFeatures: ["hit-test"],
            }}
          >
            <boxGeometry />
            <directionalLight castShadow position={[-1, -1, 1]} intensity={0.6} />  
            <ambientLight intensity={0.3} />
			
			<directionalLight castShadow position={[0, 2, 0]} intensity={0.1} />  
            
            <Sky sky={sky} />

            <Gallery modele={gallery} modele2={gallery} />

            <Paint
			   index={1}
               name="kitechdm00"
               basePosition={{  x: 5.8, y: 2.0, z:  0 }}
               baseRotation={{  x: 0,   y: 4.7, z:  0 }}
               hoverPosition={{ x: 4.5, y: 2.0, z:  0 }}
               clickPosition={{ x: 2.5, y: 2.0, z:  0 }}
               clickRotation={{ x: 0,   y: 4.6, z:  0 }}
               baseScale={1.0}
               paint={kitechdm00}
            />

            <Paint
			   index={2}
               name="kitechcr00"
               basePosition={{  x: 3.2, y: 2.0,  z: 4.8 }}
               baseRotation={{  x: 0,   y: 3.15, z: 0 }}
               hoverPosition={{ x: 3.2, y: 2.0,  z: 4.2 }}
               clickPosition={{ x: 3.2, y: 2.0,  z: 3 }}
               clickRotation={{ x: 0,   y: 3.65, z: 0 }}
               baseScale={0.8}
               paint={kitechcr00}
            />
            <Paint
			   index={3}
               name="kitechcr01"
               basePosition={{  x: -0.5, y: 2.0,  z: 4.8 }}
               baseRotation={{  x: 0,   y: 3.15, z: 0 }}
               hoverPosition={{ x: -0.5, y: 2.0,  z: 3.2 }}
               clickPosition={{ x: -0.5, y: 2.0,  z: 3.8 }}
               clickRotation={{ x: 0,   y: 3.0,  z: 0 }}
               baseScale={0.8}
               paint={kitechcr01}
            />
			<Paint
               index={4}
			   name="kitechcr02"
               basePosition={{  x: -3.6, y: 2.0,  z: 4.8 }}
               baseRotation={{  x: 0,    y: 3.15, z: 0 }}
               hoverPosition={{ x: -3.4, y: 2.0,  z: 4.2 }}
               clickPosition={{ x: -3.4, y: 2.0,  z: 3 }}
               clickRotation={{ x:  0,   y: 2.65, z: 0 }}
               baseScale={0.8}
               paint={kitechcr02}
            />

			
			<Board2Text/>
            <Board3Text/>
			
 		    <History index={0} />
            <History index={1} /> 
			<WallTitle/>
			
			<VideoMp4/>
	  	
			<Html
               as="div"
               position={[0, 0.2, -3.9]}
               rotation={[0, 0, 0]}
			   scale   ={[0.5,0.5,0.5]}
			   size    ={0.5}
               transform
               style   ={{
                  backgroundColor: "black",
				  color: "white",
                  borderRadius: 4,
               }}
            >
              {albumIndex === 1  && (<div>&nbsp;&nbsp; KITECH History &nbsp;&nbsp;</div>)}	
              {albumIndex === 2  && (<div>&nbsp; 1989 Historical Events &nbsp;</div>)} 
              {albumIndex === 3  && (<div>&nbsp; 1990 Historical Events &nbsp;</div>)}	
              {albumIndex === 4  && (<div>&nbsp; 1997 Historical Events &nbsp;</div>)}	
              {albumIndex === 5  && (<div>&nbsp; 1997 Historical Events &nbsp;</div>)}		
              {albumIndex === 6  && (<div>&nbsp; 2000 Historical Events &nbsp;</div>)}	
              {albumIndex === 7  && (<div>&nbsp; 2000 Historical Events &nbsp;</div>)}	
              {albumIndex === 8  && (<div>&nbsp; 2002 Historical Events &nbsp;</div>)}				 
              {albumIndex === 9  && (<div>&nbsp; 2002 Historical Events &nbsp;</div>)}	
              {albumIndex === 10 && (<div>&nbsp; 2003 Historical Events &nbsp;</div>)}	
              {albumIndex === 11 && (<div>&nbsp; 2004 Historical Events &nbsp;</div>)}	
              {albumIndex === 12 && (<div>&nbsp; 2004 Historical Events &nbsp;</div>)}	
              {albumIndex === 13 && (<div>&nbsp; 2005 Historical Events &nbsp;</div>)}	
              {albumIndex === 14 && (<div>&nbsp; 2006 Historical Events &nbsp;</div>)}	
              {albumIndex === 15 && (<div>&nbsp; 2006 Historical Events &nbsp;</div>)}	
              {albumIndex === 16 && (<div>&nbsp; 2006 Historical Events &nbsp;</div>)}		
              {albumIndex === 17 && (<div>&nbsp; 2006 Historical Events &nbsp;</div>)}	
              {albumIndex === 18 && (<div>&nbsp; 2007 Historical Events &nbsp;</div>)}	
              {albumIndex === 19 && (<div>&nbsp; 2008 Historical Events &nbsp;</div>)}	
              {albumIndex === 20 && (<div>&nbsp; 2008 Historical Events &nbsp;</div>)}	
              {albumIndex === 21 && (<div>&nbsp; 2009 Historical Events &nbsp;</div>)}	
              {albumIndex === 22 && (<div>&nbsp; 2009 Historical Events &nbsp;</div>)}	
              {albumIndex === 23 && (<div>&nbsp; 2009 Historical Events &nbsp;</div>)}	
              {albumIndex === 24 && (<div>&nbsp; 2012 Historical Events &nbsp;</div>)}	
              {albumIndex === 25 && (<div>&nbsp; 2012 Historical Events &nbsp;</div>)}	
              {albumIndex === 26 && (<div>&nbsp; 2014 Historical Events &nbsp;</div>)}	
              {albumIndex === 27 && (<div>&nbsp; 2016 Historical Events &nbsp;</div>)}	
              {albumIndex === 28 && (<div>&nbsp; 2018 Historical Events &nbsp;</div>)}	
              {albumIndex === 29 && (<div>&nbsp; 2019 Historical Events &nbsp;</div>)}			
		    </Html>  
		
          </XR>
        </Canvas>

      </>
    );
  };
}

export default View;

// end of View.jsx ----------------------------------------------