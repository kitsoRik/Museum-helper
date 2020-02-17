import React from 'react';

import './picture-item.scss';
import { picturesIconsBaseUrl } from '../../services/api/api';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PictureItemMenu from './picture-item-menu/picture-item-menu';
import { Card, CardActionArea, CardMedia, CardHeader } from '@material-ui/core';

const PictureItem = (props) => {
    const { editing = false } = props;
    const { picture: { id, name, description, iconName, favorite }} = props;
    const { onClick = () => {props.history.push(`/pictures/${id}`)}} = props;
    const iconPath = picturesIconsBaseUrl + iconName;
    
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