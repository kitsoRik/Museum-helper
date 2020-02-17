import React, { useState } from 'react';
import { connect } from 'react-redux'

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { addPicture } from '../../../../actions/picturesActions';


const AddPictureDialog = (props) => {
    const { museums, addPicture } = props;
    const [addDialogVisible, setAddDialogVisible] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [qrcode, setQrcode] = useState("");

    const [museumId, setMuseumId] = useState(-1);

    return ( 
        <div>
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
                    <FormControl style={{marginLeft: `10px`, flexGrow: "1"}}>
                        <InputLabel id="museums-label">Museum</InputLabel>
                        <Select value={ museumId } 
                                labelId={"museums-label"}
                                onChange={(e) => setMuseumId(e.target.value)}
                                style={{flexGrow: "1"}}
                            >
                            {
                                museums.map(m =>
                                    <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => { setAddDialogVisible(false); addPicture(museumId, name, description, qrcode); }}    
                        
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { museums } = state.museums;
    return {
        museums
    }
}
 
export default connect(mapStateToProps, { addPicture })(AddPictureDialog);