//-------------------------------------------------------------------------//
//                                                                         //
// Sky.jsx                                                                 //
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

import { useRef } from 'react';
import { useFrame } from "@react-three/fiber";

export const Sky = ({ sky }) => {
    const skyRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        skyRef.current.rotation.z = elapsedTime / 30;
    });

    return (
        <>
            <primitive
                ref={skyRef}
                object={sky.scene}
                scale={[15, 25, 1]}
                position={[0, 10, 0]}
                rotation={[1.565, 0, 0]}
            />
        </>
    );
};