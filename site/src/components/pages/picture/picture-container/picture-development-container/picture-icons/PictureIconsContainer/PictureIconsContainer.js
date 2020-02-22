import React, { useState } from 'react';


import "./PictureIconsContainer.scss";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { apiHost } from '../../../../../../../services/api/api';
import PictureIcon from '../picture-icon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const PictureIconsContainer = (props) => {

    const [pictureIndex, setPictureIndex] = useState(0);

    const { picture: { icons } } = props;

    const iconElements = icons.map((icon) => {
        return (
        <img
            className="picture-icons-current"
            key={icon.id}
            id={icon.id}
            src={`${apiHost}/static/pictureIcons/${icon.iconName}`}/>
        )
    });

    return ( 
        <div className="picture-icons-container">   
            <Pagination 
                style={{alignSelf: "center"}}
                count={iconElements.length} 
                showFirstButton 
                showLastButton
                page={pictureIndex + 1}
                onChange={(e, v) => setPictureIndex(v - 1)}
            />
            <div className="picture-icons-container-icon">
            <IconButton onClick={() => setPictureIndex(pictureIndex - 1)}>
                <ArrowBackIosIcon />
            </IconButton>
            { iconElements.length > pictureIndex && iconElements[pictureIndex] }    
            <IconButton onClick={() => setPictureIndex(pictureIndex + 1)}>
                <ArrowBackIosIcon style={{transform: 'rotate(180deg'}}/>
            </IconButton>
            </div>
        </div>
     );
}



const mapStateToProps = (state) => {
    const { picture } = state.pictureInfo;
    return {
        picture
    }
}



export default compose(
    connect(mapStateToProps)
)(PictureIconsContainer);