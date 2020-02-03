import React, { useState, useEffect } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';
import { savePictureInfo } from '../../../../../services/api/api';
import { changePictureInfoSuccessCreator } from '../../../../../actions';
import EditableTextField from '../../../../../simple-components/editable-text-field/editable-text-field';

const PictureDescriptionContainer = (props) => {

    const { index } = props;
    const { pictureInfo } = props;

    const { onPictureInfoChanged } = props;

    return ( 
        <EditableTextField 
            classname="picture-description-container"
            value={pictureInfo[index].description}
            onSaved={(description) => onPictureInfoChanged(pictureInfo[index].id, { description })}/>
     );
}

const mapStateToProps = (state) => {
    const { pictureInfo } = state.pictureInfoData;
    return {
        pictureInfo
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onPictureInfoChanged: (id, changes) => {
            savePictureInfo(id, changes)
                .then((data) => {
                    const { description } = data.result;

                    changePictureInfoSuccessCreator(id, { description }, dispatch);
                });
        }
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureDescriptionContainer);