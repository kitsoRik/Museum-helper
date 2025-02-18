import React, { useState } from 'react';
import { connect } from 'react-redux'
import { loadMuseums, addMuseum } from '../../../../actions/museums-actions';
import MuseumItemsContainer from './MuseumItemsContainer';

import './MuseumsContainer.scss';
import SpeedDial from '@material-ui/lab/SpeedDial';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { tr } from '../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../hocs/withTranslate';

const MuseumsContainer = (props) => {
    const { addMuseum } = props;

    const [addDialogVisible, setAddDialogVisible] = useState(false);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    return ( 
        <div className="museums-container">
            <MuseumItemsContainer /> 

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
                <DialogTitle >{ tr('museums.addMuseumDialog.title') }</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={ tr('constants.name') }
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label={ tr('constants.location') }
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => { setAddDialogVisible(false); addMuseum(name, location); }}    
                        
                    >{ tr('constants.add') }</Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}

const mapStateToProps = ({ museums: { museums }}) => ({
    museums
});
 
export default compose(
    connect(mapStateToProps, { loadMuseums, addMuseum }),
    withTranslate
)(MuseumsContainer);