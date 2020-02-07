import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import './picture-item.scss';
import { apiHost } from '../../services/api/api';
import { IconButton } from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addToFavorite, deleteFromFavorite } from '../../actions/picturesActions';

const PictureItem = (props) => {
    const { scaling = true } = props;
    const { picture: { id, name, description, iconName, favorite }} = props;
    const { onClick = () => {}} = props;
    const { addToFavorite, deleteFromFavorite } = props;
    const iconPath = `url(${apiHost}/static/pictureIcons/${iconName})`;

    const onClickFavorite = () => {
        if(!favorite) addToFavorite(id);
        else deleteFromFavorite(id);
    }


    return ( 
        <div 
            className="picture-item"
            scaling={scaling.toString()}
            style={{backgroundImage: iconPath}}
            onClick={onClick}>
            <div className="picture-item-header">
                <h2 className="picture-item-title">{ name }</h2>
                <IconButton onClick={(e) => { e.stopPropagation(); onClickFavorite(); }}>
                    { !!favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        addToFavorite: (id) => dispatch(addToFavorite(id)),
        deleteFromFavorite: (id) => dispatch(deleteFromFavorite(id))
    }   
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureItem);