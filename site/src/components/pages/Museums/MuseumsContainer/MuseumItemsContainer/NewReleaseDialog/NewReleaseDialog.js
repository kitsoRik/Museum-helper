import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { newReleaseMuseum } from '../../../../../../actions/museums-actions';
import { tr } from '../../../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../../../hocs/withTranslate';

const NewReleaseDialog = (props) => {

    const { newReleaseMuseum } = props;
    const { museum, visible, setVisible } = props;
    const [description, setDescription] = useState("");
    

    return ( 
            <Dialog 
                open={visible} 
                onClose={() => setVisible(false)}>
                <DialogTitle >{ tr("museums.newReleaseDialog.title") }</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={ tr("museums.newReleaseDialog.description") }
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
                        { tr("museums.newReleaseDialog.title") }
                    </Button>
                </DialogActions>
            </Dialog>
     );
}

export default compose(
    connect(null, { newReleaseMuseum }),
    withTranslate
)(NewReleaseDialog);