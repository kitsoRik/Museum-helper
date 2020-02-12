import React from 'react';
import { connect } from 'react-redux'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteFromFavorite, addToFavorite, deletePicture } from '../../../actions/picturesActions';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import FavoriteIcon from '@material-ui/icons/Favorite';

const PictureItemMenu = (props) => {

    const { id, isFavorite } = props;

    const { addToFavorite, deleteFromFavorite, deletePicture } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onClick = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const onClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const onClickFavorite = (e) => {
        if (!isFavorite) addToFavorite(id);
        else deleteFromFavorite(id);
    }

    const onClickDeletePicture = (e) => {
        e.stopPropagation();
        deletePicture(id);
    }
    console.log(isFavorite);
    return (
        <IconButton onClick={onClick}>
            <MoreVertIcon />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={onClose}
            >
                <MenuItem
                    onClick={onClickFavorite}
                >
                    <ListItemIcon>
                        {!isFavorite ? <FavoriteIcon /> : <CancelIcon />}
                    </ListItemIcon>
                    <ListItemText primary={!isFavorite ?
                        "Add to favorite" :
                        "Remove from favorite"} />

                </MenuItem>
                <MenuItem 
                    onClick={onClickDeletePicture}
                >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </Menu>
        </IconButton>
    );
}
export default connect(null, {
    addToFavorite,
    deleteFromFavorite,
    deletePicture
})(PictureItemMenu);