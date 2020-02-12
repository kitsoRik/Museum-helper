import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import './picture-item.scss';
import { apiHost } from '../../services/api/api';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PictureItemMenu from './picture-item-menu/picture-item-menu';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, CardHeader } from '@material-ui/core';

const PictureItem = (props) => {
    const { editing = false } = props;
    const { picture: { id, name, description, iconName, favorite }} = props;
    const { onClick = () => {props.history.push(`/pictures/${id}`)}} = props;
    const iconPath = `${apiHost}/static/pictureIcons/${iconName}`;
    
    return ( 
        <Card className="picture-item" onClick={onClick}>
            <CardHeader
                action={
                    <PictureItemMenu id={id} isFavorite={!!favorite} />
                }
                title={name}
                subheader={description}
            />
            <CardActionArea>
                <CardMedia 
                    style={{height: `140px`}}
                    image={iconPath}
                    title="Contemplative Reptile"
                />
            </CardActionArea>
        </Card>
     );
}

 
export default compose(
    withRouter
)(PictureItem);