import React, { useState } from 'react';
import { connect } from 'react-redux'

import PictureDescriptionContainer from './picture-description-container/picture-description-container.js';

import './picture-info-container.scss';
import PictureLanguages from './picture-languages/picture-languages.js';

const PictureInfoContainer = (props) => {

    const [languageIndex, setLanguageIndex] = useState(0);

    const { picture, pictureInfo } = props;

    if(pictureInfo.length === 0)
        return <span>WAIT</span>
    
    return ( 
        <div className="picture-info-container">
            <PictureLanguages 
                pictureInfo={pictureInfo}
                languageIndex={languageIndex}
                setLanguageIndex={setLanguageIndex}/>
            <PictureDescriptionContainer 
                picture={picture}
                pictureInfo={pictureInfo} 
                index={languageIndex} />
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureInfoContainer);