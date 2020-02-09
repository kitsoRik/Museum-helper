import React, { useState, useEffect } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';
import { savePictureInfo } from '../../../../../../services/api/api';
import { changePictureInfoCreator } from '../../../../../../actions/picturesInfoActions';

import { debounce } from 'debounce'
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';


const PictureDescriptionContainer = (props) => {


    const { currentIndex, pictureInfo } = props;
    const { onPictureInfoChanged } = props;

    const [description, setDescription] = useState("");

    useEffect(() => {
        if(currentIndex === -1) return;
        setDescription(pictureInfo[currentIndex].description);
    }, [ currentIndex ]);

    useEffect(() => {
        if(currentIndex === -1) return;
        onPictureInfoChanged(pictureInfo[currentIndex].id, { description });
    }, [ description ]);
    
    if(currentIndex === -1) return <span>SELECT LANGUAGE</span>

    return (
        <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
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

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onPictureInfoChanged: debounce(
            (id, changes) => 
                dispatch(changePictureInfoCreator(id, changes))
                , 1000)
    }
}

export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withRouter
)
(PictureDescriptionContainer);