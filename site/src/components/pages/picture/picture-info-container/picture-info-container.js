import React, { useState } from 'react';
import { connect } from 'react-redux'

import PictureDescriptionContainer from './picture-description-container/picture-description-container.js';

import './picture-info-container.scss';
import PictureLanguages from './picture-languages/picture-languages.js';
import EditableTextField from '../../../../simple-components/editable-text-field/editable-text-field.js';
import { changePictureInfoCreator, addLanguageInfoCreator } from '../../../../actions/picturesInfoActions.js';

import TextField from '@material-ui/core/TextField';

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
                <TextField  
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
    const { picture, pictureInfo } = state.pictursInfo;
    return {
        picture,
        pictureInfo
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        changePictureInfoPartTitle:  (id, title) => dispatch(changePictureInfoCreator(id, { title }, dispatch)),
        addLanguage: (id, language) => dispatch(addLanguageInfoCreator(id, language, dispatch))
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureInfoContainer);