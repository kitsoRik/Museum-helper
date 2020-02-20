import React, { useState } from 'react';

import './picture-icons.scss';
import PictureIcon from './picture-icon/picture-icon';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { apiHost } from '../../../../../../services/api/api';
import { IconButton } from '@material-ui/core';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import { addIcon } from '../../../../../../actions/picturesInfoActions';

const PictureIconsContainer = (props) => {
    const { picture } = props;
    const { addIcon } = props;

    const { icons } = picture;

    const iconElements = icons.map((icon) => {
        return (
        <PictureIcon 
            key={icon.id}
            id={icon.id}
            source={`${apiHost}/static/pictureIcons/${icon.iconName}`}/>
        )
    });

    return ( 
        <div 
            className="picture-icons"
        >
            <div className="picture-icons-header">   
                <h2>Icons</h2>
                <IconButton
                        onClick={(e) => {
                            let input = document.createElement('input');
                            input.type = "file";
                            input.click();

                            input.onchange = (e) => {
                                if(input.files.length === 0)
                                    return;
                                addIcon(picture.id, input.files[0]);
                            }
                        }}>
                    <AddAPhotoRoundedIcon 
                        color="primary"/>
                </IconButton>
            </div>
            <div className="picture-icons-container">  
                { iconElements }
               
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
    connect(mapStateToProps, { addIcon })
)(PictureIconsContainer);