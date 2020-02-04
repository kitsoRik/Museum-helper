import React from 'react';

import "./picture-languages.scss";
import { connect } from 'react-redux';
import { changePictureInfoCreator, addLanguageInfoCreator } from '../../../../../actions/picturesInfoActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const PictureLanguages = (props) => {

    const { picture, pictureInfo, languageIndex } = props;
    const { changeLanguageName, addLanguage } = props;

    const languageItems = pictureInfo.map((info) => {
        return <MenuItem key={info.id} value={info.id} >{info.language}</MenuItem>
    });

    const onAddLanguageClick = () => {
        const lang = prompt("Which language will be added? (anything)");
        if (!lang) return;
        addLanguage(picture.id, lang);
    }

    return (
        <div className="picture-languages">
            <InputLabel id="language-label">Language</InputLabel>
            <Select 
                labelId="language-label"
                onChange={(e) => console.log(e)}>
                    <MenuItem value="">None</MenuItem>
                {languageItems}
            </Select>
            <TextField
                variant="outlined"
                value={pictureInfo[languageIndex].language}
                onBlur={(e) => changeLanguageName(pictureInfo[languageIndex].id, e.target.value)}
                onChange={(e) => changeLanguageName(pictureInfo[languageIndex].id, e.target.value)} />
            <Button
                onClick={onAddLanguageClick}>
                ADD
            </Button>
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
        changeLanguageName: (id, name) => dispatch(changePictureInfoCreator(id, { language: name }, dispatch)),
        addLanguage: (id, language) => dispatch(addLanguageInfoCreator(id, language, dispatch))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureLanguages);