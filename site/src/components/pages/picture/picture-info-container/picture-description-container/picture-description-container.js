import React, { useState, useEffect, useCallback } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';
import { savePictureInfo } from '../../../../../services/api/api';
import { changePictureInfoCreator } from '../../../../../actions/picturesInfoActions';
import EditableTextField from '../../../../../simple-components/editable-text-field/editable-text-field';

import { debounce } from 'debounce'
import TextField from '@material-ui/core/TextField';


const PictureDescriptionContainer = (props) => {

    const { index } = props;
    const { pictureInfo } = props;

    const { onPictureInfoChanged } = props;

    const [description, setDescription] = useState(pictureInfo[0].description)
    
    // const checkAndWrite = useCallback(debounce(() => 
    //         onPictureInfoChanged(pictureInfo[index].id, { description }), 2000),
    //         [ ], );

    //const [s1, setS] = useState(debounce(() => onPictureInfoChanged(pictureInfo[index].id, { description }), 2000));
    
    return (
        <TextField
            id="filled-basic" 
            variant="filled"
            className="picture-description-container"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => onPictureInfoChanged(pictureInfo[index].id, { description })}
        />
    );
}

const mapStateToProps = (state) => {
    const { pictureInfo } = state.pictursInfo;
    return {
        pictureInfo
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onPictureInfoChanged: (id, changes) => dispatch(changePictureInfoCreator(id, changes, dispatch))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureDescriptionContainer);