import React, { useState } from 'react';
import { connect } from 'react-redux'

import { NOT_LOADED, IS_LOADING, ERROR_LOADING } from '../../../../constants';

import "./pictures-container.scss";
import { Link, withRouter } from 'react-router-dom';
import PictureItem from '../../../picture-item';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EditIcon from '@material-ui/icons/Edit';
import { compose } from 'redux';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import { addPicture } from '../../../../actions/picturesActions';

const PicturesContainer = (props) => {

    const { loadingState } = props;

    const [addDialogVisible, setAddDialogVisible] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [qrcode, setQrcode] = useState("");

    if(loadingState === NOT_LOADED) return <span>NOT LOADED</span>
    if(loadingState === IS_LOADING) return ( 
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: '1'}}>
            <CircularProgress/>
        </div> 
        );
    if(loadingState === ERROR_LOADING) return <span>ERROR</span>

    const { pictures, addPicture } = props;

    const pictureItems = pictures.map(item => (
            <PictureItem key={item.id} picture={item} onClick={() => props.history.push(`/pictures/${item.id}`)}/>
    ));

    return ( 
        <div className="pictures-container">
            { pictureItems }

            <SpeedDial
                ariaLabel=""
                style={{position: "fixed", bottom: "30px", right: "30px"}}
                hidden={false}
                open={false}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClick={() => setAddDialogVisible(true)}
            >
            </SpeedDial>
            <Dialog 
                open={addDialogVisible} 
                onClose={() => setAddDialogVisible(false)}>
                <DialogTitle >Add picture</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="QR Code"
                        fullWidth
                        value={qrcode}
                        onChange={(e) => setQrcode(e.target.value)}
                    />
                    </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => { setAddDialogVisible(false); addPicture(name, description, qrcode); }}    
                        
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}

const mapStateToProps = (state) => {

    const { loading, pictures } = state.pictures;
    
    return {
        loadingState: loading,
        pictures
    }
}
 
export default compose(
    connect(mapStateToProps, { addPicture }),
    withRouter
)(PicturesContainer);