import React from 'react';

import "./picture-upper-panel-data-item.scss";
import { connect } from 'react-redux';
import { changePictureCreator } from '../../../../../actions/picturesInfoActions';

import TextField from '@material-ui/core/TextField';

const PictureUpperPanelDataItem = (props) => {

    const { picture, label, option } = props;
    const { onPictureChanged } = props;
    
    const value = picture[option];
    
    return (
            <TextField
                label={option}
                value={value}
                defaultValue=" "
                variant="outlined"
                onChange={(e) => onPictureChanged(picture.id, { [option]: e.target.value})} />
    );
}

const mapStateToProps = (state) => {
    const { picture } = state.pictureInfo;
    return {
        picture
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onPictureChanged: (id, changes) => dispatch(changePictureCreator(id, changes, dispatch))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureUpperPanelDataItem)