import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import PictureDescriptionContainer from './picture-description-container/picture-description-container.js';

import './picture-prodaction-container.scss';
import PictureLanguages from './picture-languages';
import { changePictureInfo, triggeredAddLanguageInfo } from '../../../../../actions/picturesInfoActions.js';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { debounce } from 'debounce';
import AddLanguageInfo from '../add-language-info/index.js';

const PictureProductionContainer = (props) => {

    const [addLanguageDialogVisible, setAddLanguageDialogVisible] = useState(false);
    const { currentIndex, picture, pictureInfo } = props;
    const { changePictureInfoPartTitle } = props;
    
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
                onClick={() => setAddLanguageDialogVisible(true)}
            >Add your first language info
            
            
            
            <AddLanguageInfo
                    visible={addLanguageDialogVisible}
                    setVisible={setAddLanguageDialogVisible}
                />
            </Button>
        )
    }
    
    return ( 
        <div className="picture-info-container">
            <PictureLanguages 
                setAddLanguageDialogVisible={setAddLanguageDialogVisible}/>
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
            
            <AddLanguageInfo
                    visible={addLanguageDialogVisible}
                    setVisible={setAddLanguageDialogVisible}
                />
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
        changePictureInfoPartTitle: debounce((id, title) => dispatch(changePictureInfo(id, { title })), 1000)
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureProductionContainer);