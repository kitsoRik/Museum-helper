import React, { useState } from 'react';

import "./picture-languages.scss";
import { connect } from 'react-redux';
import { changePictureInfo, changeCurrentIndex, triggeredAddLanguageInfo} from '../../../../../../actions/picturesInfoActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import AddLanguageInfo from '../../add-language-info/add-language-info';
import { LANGUAGES_BY_DEV } from '../../../../../../constants';

const PictureLanguages = (props) => {

    const { picture, pictureInfo, currentIndex } = props;
    const { setAddLanguageDialogVisible } = props;
    const { changeCurrentIndex, changeLanguageName } = props;

    const languageItems = pictureInfo.map((info, index) => {
        return <MenuItem key={info.id} value={index} >{LANGUAGES_BY_DEV[info.language]}</MenuItem>
    });
    
    return (
        <div className="picture-languages">
            
            <FormControl variant="outlined" style={{flexGrow: '1'}}>
                <InputLabel id="demo-simple-select-outlined-label">
                Language
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currentIndex}
                    onChange={(e) => changeCurrentIndex(e.target.value)}
                    labelWidth={0}
                >
                    { languageItems }
                </Select>
            </FormControl>
            <Button
                variant="contained" 
                color="primary"
                onClick={() => setAddLanguageDialogVisible(true)}>
                ADD
            </Button>
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
        changeCurrentIndex: (index) => dispatch(changeCurrentIndex(index))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureLanguages);