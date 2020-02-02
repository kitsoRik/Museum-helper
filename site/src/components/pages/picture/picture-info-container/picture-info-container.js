import React, { useState } from 'react';
import { connect } from 'react-redux'

import PictureDescriptionContainer from './picture-description-container/picture-description-container.js';

import './picture-info-container.scss';
import PictureLanguages from './picture-languages/picture-languages.js';

const PictureInfoContainer = (props) => {

    const [languageIndex, setLanguageIndex] = useState(0);

    const { loaded, picture, pictureInfo } = props;
    const { onLanguageAdded, onPictureInfoChanged } = props;

    if(!loaded)
        return <span>WAIT</span>
    
    if(pictureInfo.length === 0) {
        return (
            <button 
                onClick={() => onLanguageAdded(prompt("Which? (ua, en, ru...)"))}
            >Add your first language info</button>
        )
    }
    
    return ( 
        <div className="picture-info-container">
            <PictureLanguages 
                pictureInfo={pictureInfo}
                languageIndex={languageIndex}
                setLanguageIndex={setLanguageIndex}
                onLanguageAdded={onLanguageAdded}/>
            <PictureDescriptionContainer 
                picture={picture}
                pictureInfo={pictureInfo} 
                index={languageIndex}
                onPictureInfoChanged={onPictureInfoChanged} />
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