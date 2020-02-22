import React, { useState } from 'react';
import { connect } from 'react-redux'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { newReleaseMuseum } from '../../../../../../actions/museumsActions';

const NewReleaseDialog = (props) => {

    const { newReleaseMuseum } = props;
    const { museum, visible, setVisible } = props;
    const [description, setDescription] = useState("");
    

    return ( 
            <Dialog 
                open={visible} 
                onClose={() => setVisible(false)}>
                <DialogTitle >Add picture</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Descriprion release"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => { setVisible(false); newReleaseMuseum(museum.id)}}    
                        
                    >
                        New release
                    </Button>
                </DialogActions>
            </Dialog>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}
 
export default connect(mapStateToProps, { newReleaseMuseum })(NewReleaseDialog);