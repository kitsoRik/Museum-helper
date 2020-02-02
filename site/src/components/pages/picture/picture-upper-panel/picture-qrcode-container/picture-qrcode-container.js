import React, { useState } from 'react';

import './picture-qrcode-container.scss';
const PictureQrcodeContainer = (props) => {
    const { qrcode } = props;

    const { onQrcodeChanged } = props;

    return ( 
        <div className="picture-qrcode-container">
            <img 
                className="picture-qrcode-icon" 
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrcode}`} 
                alt="QRCODE"/>
            <h3 
                contentEditable="true"
                suppressContentEditableWarning={true}
                className="picture-qrcode-text"
                onBlur={(e) => onQrcodeChanged(e.target.innerText)}
            >{ qrcode }</h3>
        </div>
     );
}

export default PictureQrcodeContainer;