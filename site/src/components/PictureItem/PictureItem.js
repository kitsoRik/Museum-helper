import React from 'react';

import './PictureItem.scss';
import { picturesIconsBaseUrl } from '../../services/api/api';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PictureItemMenu from './PictureItemMenu/PictureItemMenu';
import { Card, CardActionArea, CardMedia, CardHeader } from '@material-ui/core';

const PictureItem = (props) => {
    const { editing = false } = props;
    const { picture: { id, name, description, iconName, favorite }} = props;
    const { onClick = () => {if(!editing) props.history.push(`/pictures/${id}`)}} = props;
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
                    title={name}
                />
            </CardActionArea>
        </Card>
     );
}

 
export default compose(
    withRouter
)(PictureItem);