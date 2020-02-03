import React, { useState } from 'react';
import { connect } from 'react-redux'

import PictureDescriptionContainer from './picture-description-container/picture-description-container.js';

import './picture-info-container.scss';
import PictureLanguages from './picture-languages/picture-languages.js';
import EditableTextField from '../../../../simple-components/editable-text-field/editable-text-field.js';
import { savePictureInfo, addLanguageInfo } from '../../../../services/api/api.js';
import { languageInfoAddedCreator } from '../../../../actions/index.js';

const PictureInfoContainer = (props) => {

    const [languageIndex, setLanguageIndex] = useState(0);

    const { picture, pictureInfo } = props;
    const { changePictureInfoPartTitle, addLanguage } = props;
    
    if(pictureInfo.length === 0) {
        return (
            <button 
                onClick={() => addLanguage(picture.id, prompt("Which? (ua, en, ru...)"))}
            >Add your first language info</button>
        )
    }
    
    return ( 
        <div className="picture-info-container">
            <div className="picture-info-container-upper-part">
                <EditableTextField 
                        classname="picture-info-container-title" 
                        value={ pictureInfo[languageIndex].title }
                        onSaved={(v) => changePictureInfoPartTitle(pictureInfo[languageIndex].id, v)}/>
                <PictureLanguages 
                    languageIndex={languageIndex}
                    setLanguageIndex={(i) => setLanguageIndex(i)}/>
            </div>
            <PictureDescriptionContainer index={languageIndex}/>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { picture, pictureInfo } = state.pictureInfoData;
    return {
        picture,
        pictureInfo
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        changePictureInfoPartTitle: (id, title) => {
            savePictureInfo(id, {title})
                .then((data) => {
                    
                });
        },
        addLanguage: (id, language) => {
            addLanguageInfo(id, language)
                .then((data) => {
                    languageInfoAddedCreator(data.addedPictureInfo, dispatch);
                });
        }
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureInfoContainer);