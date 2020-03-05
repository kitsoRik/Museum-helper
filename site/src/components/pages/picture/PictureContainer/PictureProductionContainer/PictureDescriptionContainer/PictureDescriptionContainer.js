import React, { useState, useEffect } from 'react';

import './PictureDescriptionContainer.scss';
import { connect } from 'react-redux';
import { changePictureInfo } from '../../../../../../actions/pictures-info-actions';

import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { tr } from '../../../../../../services/i18n/i18n';


const PictureDescriptionContainer = (props) => {
    const { currentIndex, pictureInfo } = props;
    const { changePictureInfo } = props;
    const currentPictureInfo = pictureInfo[currentIndex]; 

    const [description, setDescription] = useState("");

    useEffect(() => {
        if(currentIndex === -1) return;
        setDescription(pictureInfo[currentIndex].description);
    }, [ currentIndex ]);
    
    if(currentIndex === -1) return (
        <span className="picture-description-unknown">
            { tr('picture.selectLanguage') }
        </span>)

    return (
        <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => currentPictureInfo.description !== description ? changePictureInfo(currentPictureInfo.id, {description}) : {}}
            className="picture-description-container" />
    );
}

const mapStateToProps = (state) => {
    const { currentIndex, pictureInfo } = state.pictureInfo;
    return {
        currentIndex,
        pictureInfo
    }
}

export default compose(
    connect(mapStateToProps, { changePictureInfo }),
    withRouter
)
(PictureDescriptionContainer);