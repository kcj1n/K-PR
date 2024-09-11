//-------------------------------------------------------------------------//
//                                                                         //
// index.js                                                                //
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { View } from './pages/View';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
