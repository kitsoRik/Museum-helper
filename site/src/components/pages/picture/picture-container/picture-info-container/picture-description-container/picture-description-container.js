import React, { useState, useEffect } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';
import { savePictureInfo } from '../../../../../../services/api/api';
import { changePictureInfoCreator } from '../../../../../../actions/picturesInfoActions';

import { debounce } from 'debounce'
import TextField from '@material-ui/core/TextField';


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
    
    // const checkAndWrite = useCallback(debounce(() => 
    //         onPictureInfoChanged(pictureInfo[index].id, { description }), 2000),
    //         [ ], );

    //const [s1, setS] = useState(debounce(() => onPictureInfoChanged(pictureInfo[index].id, { description }), 2000));
    
    if(currentIndex === -1) return <span>SELECT LANGUAGE</span>

    return (
        <TextField
            id="filled-basic" 
            variant="filled"
            label="Description"
            className="picture-description-container"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
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

export default connect(mapStateToProps, mapDipatchToProps)(PictureDescriptionContainer);