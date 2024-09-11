//-------------------------------------------------------------------------//
//                                                                         //
// CrossHair.jsx                                                           //
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

import './CrossHair.css'

export const CrossHair = () => {
    return (
        <div className="crosshair">
            <div className="crosshair__vertical"></div>
            <div className="crosshair__horizontal"></div>
        </div>
    );
};
