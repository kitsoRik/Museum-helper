import React, { useState } from 'react';
import { connect } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { removeMuseum } from '../../../../../../actions/museumsActions';

const MuseumItemContextMenu = (props) => {
    const {museum = {}, visible, setVisible, position} = props;
    const { removeMuseum } = props;

    const [removeDialogVisible, setRemoveDialogVisible] = useState(false);

    const removeClick = (e) => {
        e.stopPropagation(); 
        setVisible(false);
        setRemoveDialogVisible(true);
    }

    return ( 
        <div>
            <Menu
                id="long-menu"
                anchorReference="anchorPosition"
                anchorPosition={{ top: position.y, left: position.x }}
                keepMounted
                open={visible}
                onClose={(e) => {e.stopPropagation(); setVisible(false)}}
            >
                <MenuItem 
                    key={-1} 
                    onClick={removeClick}>
                    Remove
                </MenuItem>
            </Menu>

            <Dialog
                open={removeDialogVisible}
                onClose={() => setRemoveDialogVisible(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Remove ${museum.name}?`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action is irrevocable. Be more accurate!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => { removeMuseum(museum.id); setRemoveDialogVisible(false)}} color="primary" autoFocus>
                    Yes, i want remove it!
                </Button>
                <Button onClick={() => setRemoveDialogVisible(false)} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}
 
export default connect(mapStateToProps, { removeMuseum })(MuseumItemContextMenu);