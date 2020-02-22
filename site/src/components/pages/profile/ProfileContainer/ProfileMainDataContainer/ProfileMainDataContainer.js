import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import './ProfileMainDataContainer.scss';
import { TextField, InputLabel, Divider, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { changeUserData } from '../../../../../actions/userActions';
import { CHANGED } from '../../../../../constants';
import { tr } from '../../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../../hocs/withTranslate';

const ProfileMainDataContainer = (props) => {

    const {
        email,
        username,
        loading,
        changing,
        error
    } = props;

    const { changeUserData } = props;

    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        if(changing === CHANGED) setConfirmDialogVisible(false);
    }, [ changing ]);
    
    return ( 
        <div className="profile-main-data-container">
            <div className="profile-photo">
                { /*<img src="https://i.pinimg.com/originals/a7/62/2e/a7622e9d64921dbe9792d5cf11fca089.png" alt="123"/> */ }
            </div>
            <div className="profile-main-data-fields">
                <TextField label={tr("profile.username")} disabled value={username} />
                <TextField label={tr("profile.email")} disabled value={email} />
                <Divider />   
                <TextField label={tr('profile.password')} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <TextField label={tr('profile.confirm')} type={"password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                <Button variant="contained" onClick={() => setConfirmDialogVisible(true)}>
                { tr('profile.change') }
                </Button>
                <Divider />
            </div>

            <Dialog 
                open={confirmDialogVisible}
                onClose={() => setConfirmDialogVisible(false)}>
                <DialogTitle>
                    { tr('profile.changePassword') }
                </DialogTitle>
                <DialogContent>
                    <TextField
                        error={error && error.type === "BAD_OLD_PASSWORD"} 
                        label={ tr('profile.oldPassword') }
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeUserData(oldPassword, { password })}>
                        { tr('profile.change') }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}

const mapStateToProps = ({ user: { email, username, loading, changing, error }}) => {
    return {
        email,
        username,
        loading,
        changing,
        error
    }
}
export default compose(
    connect(mapStateToProps, { changeUserData }),
    withTranslate
)(ProfileMainDataContainer);