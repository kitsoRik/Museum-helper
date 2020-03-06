import React, { useState } from 'react';


import "./PictureIconsContainer.scss";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { apiHost } from '../../../../../../../services/api/api';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, Button, ButtonGroup } from '@material-ui/core';
import { deleteIcon } from '../../../../../../../actions/pictures-info-actions';
import Pagination from '@material-ui/lab/Pagination';
import { tr } from '../../../../../../../services/i18n/i18n';

const PictureIconsContainer = (props) => {

    const [pictureIndex, setPictureIndex] = useState(0);

    const { picture: { icons } } = props;
    const { deleteIcon } = props;

    let currentIcon = icons[pictureIndex];

    if(icons.length === 0) return null;
    if(!currentIcon) {
        setPictureIndex(icons.length - 1);
        return null;
    }
    return ( 
        <div className="picture-icons-container">   
            <Pagination 
                style={{alignSelf: "center"}}
                count={icons.length} 
                showFirstButton 
                showLastButton
                page={pictureIndex + 1}
                onChange={(e, v) => setPictureIndex(v - 1)}
            />
            <div className="picture-icons-container-icon">
            <IconButton onClick={() => setPictureIndex(pictureIndex - 1)}>
                <ArrowBackIosIcon />
            </IconButton>
                <img
                alt="Icon"
                className="picture-icons-current"
                key={currentIcon.id}
                src={`${apiHost}/static/pictureIcons/${currentIcon.iconName}`}/>
            <IconButton onClick={() => setPictureIndex(pictureIndex + 1)}>
                <ArrowBackIosIcon style={{transform: 'rotate(180deg'}}/>
            </IconButton>
            </div>

            <ButtonGroup
                variant="contained" 
                color="primary"
                style={{ display: 'flex', justifyContent: 'center'}}
            >
                {/* <Button>Change</Button> */}
            <Button onClick={() => deleteIcon(currentIcon.id)}>{ tr("contstants.remove") }</Button>
            </ButtonGroup>
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
    connect(mapStateToProps, { deleteIcon })
)(PictureIconsContainer);