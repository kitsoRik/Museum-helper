import React, { useState } from 'react';

import './picture-icon-container.scss';

const PictureIconContainer = (props) => {

    const { iconPath } = props;

    const [scale, setScale] = useState(1);

    return ( 
        <div 
            className="picture-icon-container"
            onWheel={(e) => {
                let fScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
                if(fScale <= 0.1) fScale = 0.1
                else if(fScale >= 5) fScale = 5;
                setScale(fScale);
            }}
        >
            <img 
                className="picture-icon-container-image"
                src={ iconPath } 
                alt="Icon"
                style={{transform: `scale(${scale})`}}
                />
        </div>
     );
}

export default PictureIconContainer;