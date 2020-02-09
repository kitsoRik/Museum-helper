import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import './picture-item.scss';
import { apiHost } from '../../services/api/api';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PictureItemMenu from './picture-item-menu/picture-item-menu';

const PictureItem = (props) => {
    const { editing = false } = props;
    const { picture: { id, name, description, iconName, favorite }} = props;
    const { onClick = () => {props.history.push(`/pictures/${id}`)}} = props;
    const iconPath = `url(${apiHost}/static/pictureIcons/${iconName})`;


    return ( 
        <div 
            className="picture-item"
            editing={(editing).toString()}
            style={{backgroundImage: iconPath}}
            onClick={() => { if(!editing) onClick() }}>
            <div className="picture-item-header">
                <h2 className="picture-item-title">{ name }</h2>
                <PictureItemMenu id={id} isFavorite={!!favorite}/>
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

    }   
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withRouter
)(PictureItem);