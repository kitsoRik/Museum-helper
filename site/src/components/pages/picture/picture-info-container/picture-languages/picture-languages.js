import React from 'react';

import "./picture-languages.scss";
import { connect } from 'react-redux';
import EditableTextField from '../../../../../simple-components/editable-text-field/editable-text-field';
import { savePictureInfo, addLanguageInfo } from '../../../../../services/api/api';
import { changePictureSuccessCreator, changePictureInfoSuccessCreator, languageInfoAddedCreator } from '../../../../../actions';

const PictureLanguages = (props) => {

    const { picture, pictureInfo, languageIndex } = props;
    const { setLanguageIndex } = props;
    const { changeLanguageName, addLanguage } = props;

    const languageItems = pictureInfo.map((info) => {
        return <option key={info.id}>{info.language}</option>
    });

    const onAddLanguageClick = () => {
        const lang = prompt("Which language will be added? (anything)");
        if (!lang) return;
        addLanguage(picture.id, lang);
    }

    return (
        <div className="picture-languages">
            <select
                onChange={(e) => setLanguageIndex(e.target.selectedIndex)}>
                {languageItems}
            </select>
            <EditableTextField
                value={pictureInfo[languageIndex].language}
                onSaved={(v) => changeLanguageName(pictureInfo[languageIndex].id, v)} />
            <button
                onClick={onAddLanguageClick}>
                ADD
            </button>
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
        changeLanguageName: (id, name) => {
            savePictureInfo(id, { language: name })
                .then((data) => {
                    if (data.success) {
                        changePictureInfoSuccessCreator(id, data.result, dispatch);
                    }
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

export default connect(mapStateToProps, mapDipatchToProps)(PictureLanguages);