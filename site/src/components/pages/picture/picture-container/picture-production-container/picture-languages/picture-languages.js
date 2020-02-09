import React, { useState } from 'react';

import "./picture-languages.scss";
import { connect } from 'react-redux';
import { changePictureInfoCreator, changeCurrentIndexCreator, triggeredAddLanguageInfoCreator } from '../../../../../../actions/picturesInfoActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal'
import AddLanguageInfo from '../../add-language-info/add-language-info';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const PictureLanguages = (props) => {
    const classes = useStyles();
    const { picture, pictureInfo, currentIndex } = props;
    const { changeCurrentIndex, changeLanguageName, triggerAddLanguage } = props;

    const languageItems = pictureInfo.map((info, index) => {
        return <MenuItem key={info.id} value={index} >{info.language}</MenuItem>
    });
    
    return (
        <div className="picture-languages">
            
            <FormControl variant="outlined" className={classes.formControl}>
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
            { currentIndex !== -1 && 
                <TextField
                    variant="outlined"
                    value={pictureInfo[currentIndex].language}
                    onBlur={(e) => changeLanguageName(pictureInfo[currentIndex].id, e.target.value)}
                    onChange={(e) => changeLanguageName(pictureInfo[currentIndex].id, e.target.value)} />
            }
            <Button
                variant="contained" 
                color="primary"
                onClick={() => triggerAddLanguage()}>
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
        changeLanguageName: (id, name) => dispatch(changePictureInfoCreator(id, { language: name }, dispatch)),
        changeCurrentIndex: (index) => dispatch(changeCurrentIndexCreator(index)),
        triggerAddLanguage: () => dispatch(triggeredAddLanguageInfoCreator())
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureLanguages);