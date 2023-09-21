import React from 'react';
import './css/LoadingPage.css';

import loadingGif from './gif/Mess_Loading_gif.gif';

const LoadingPage = () => {
  return (
    <div className="loader" style={{backgroundColor:'white'}}>
      {/* Add the GIF as an <img> element */}
      <img src={loadingGif} alt="Loading" style={{maxWidth:'100vw', maxHeight:'100vh'}}/>

      
    </div>
  );
};

export default LoadingPage;
