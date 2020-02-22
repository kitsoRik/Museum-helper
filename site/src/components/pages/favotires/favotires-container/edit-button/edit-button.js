import React, { useState } from 'react';
import { connect } from 'react-redux'
import SaveIcon from '@material-ui/icons/Save';
import SpeedDial from '@material-ui/lab/SpeedDial';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogTitle, Button, TextField, DialogContentText, InputLabel } from '@material-ui/core';

import './edit-button.scss';
import { addFavoriteGroup } from '../../../../../actions/favoritesActions';
import withTranslate from '../../../../hocs/withTranslate';
import { compose } from 'redux';
import { tr } from '../../../../../services/i18n/i18n';

const EditButton = (props) => {

    const { editable, switchEditable } = props;
    const { addFavoriteGroup } = props;

    const [dialogOpened, setDialogOpened] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return ( 
        <div>
            <SpeedDial
                style={{position: "fixed", right: "15px", bottom: "15px"}}
                ariaLabel="SpeedDial openIcon example"
                hidden={false}
                icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<SaveIcon />} />}
                open={editable}
                onClick={() => switchEditable(!editable)}
            >
                <SpeedDialAction
                    key={2}
                    icon={<AddIcon />}
                    tooltipTitle={ tr('constants.add') }
                    onClick={(e) => { e.stopPropagation(); setDialogOpened(true);}}
                />
            </SpeedDial>
            <Dialog
                style={{padding: "10px"}} 
                open={dialogOpened} 
                onClose={() => setDialogOpened(false)}>
                <DialogTitle>{ tr('favorites.addNewGroup') }</DialogTitle>
                <div className="favorites-add-group-dialog">
                    <TextField 
                        id="name-field"
                        label="Name"
                        variant="outlined"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                    <TextField 
                        id="description-field"
                        label="Description"
                        variant="outlined"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}/>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => addFavoriteGroup(name, description)}
                    >{ tr('constants.add') }</Button>
                </div>
            </Dialog>
        </div>
     );
}
 
export default compose(
    connect(null, { addFavoriteGroup }),
    withTranslate
)(EditButton);