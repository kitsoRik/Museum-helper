import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import PictureDescriptionContainer from './picture-description-container/picture-description-container.js';

import './picture-prodaction-container.scss';
import PictureLanguages from '../picture-info-container/picture-languages/picture-languages';
import { changePictureInfoCreator, triggeredAddLanguageInfoCreator } from '../../../../../actions/picturesInfoActions.js';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { debounce } from 'debounce';

const PictureProdactionContainer = (props) => {

    const { currentIndex, picture, pictureInfo } = props;
    const { changePictureInfoPartTitle, triggerAddLanguage } = props;
    
    const [title, setTitle] = useState("");

    useEffect(() => {
        if(currentIndex === -1) return;
        setTitle(pictureInfo[currentIndex].title);
    }, [ currentIndex ])

    useEffect(() => {
        if(currentIndex === -1) return;
        changePictureInfoPartTitle(pictureInfo[currentIndex].id, title);
    }, [ title ])

    if(pictureInfo.length === 0) {
        return (
            <Button 
                variant="contained"
                color="primary"
                style={{flexGrow: "1"}}
                onClick={() => triggerAddLanguage()}
            >Add your first language info</Button>
        )
    }
    
    return ( 
        <div className="picture-info-container">
            <PictureLanguages />
            <div className="picture-info-container-upper-part">
               { 
                currentIndex !== -1 && 
                    <TextField  
                        style={{flexGrow: "1"}}
                        label="Title"
                        variant="filled"
                        value={ title }
                        onChange={(e) => setTitle(e.target.value)}/>
               }
            </div>
            <PictureDescriptionContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    const { currentIndex, picture, pictureInfo } = state.pictureInfo;
    return {
        currentIndex,
        picture,
        pictureInfo
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        changePictureInfoPartTitle: debounce((id, title) => dispatch(changePictureInfoCreator(id, { title }, dispatch)), 1000),
        triggerAddLanguage: () => dispatch(triggeredAddLanguageInfoCreator())
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureProdactionContainer);