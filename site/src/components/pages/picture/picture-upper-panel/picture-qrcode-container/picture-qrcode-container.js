import React, { useState, useEffect } from 'react';

import './picture-qrcode-container.scss';
const PictureQrcodeContainer = (props) => {
    const { qrcode } = props;

    return ( 
        <div className="picture-qrcode-container">
            <img 
                className="picture-qrcode-icon" 
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrcode}`} 
                alt="QRCODE"/>
            <h3 className="picture-qrcode-text">{ qrcode }</h3>
        </div>
     );
}

export default PictureQrcodeContainer;