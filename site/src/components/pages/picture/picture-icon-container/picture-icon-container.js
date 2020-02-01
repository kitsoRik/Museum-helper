import React from 'react';


const PictureIconContainer = (props) => {
    const { iconPath } = props;

    return ( 
        <div>
            <img src={ iconPath } alt="Icon"/>
        </div>
     );
}

export default PictureIconContainer;