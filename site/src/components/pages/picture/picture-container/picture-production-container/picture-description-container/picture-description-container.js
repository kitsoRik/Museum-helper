import React, { useState, useEffect } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';
import { changePictureInfo } from '../../../../../../actions/picturesInfoActions';

import { debounce } from 'debounce'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';


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
            SELECT LANGUAGE
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