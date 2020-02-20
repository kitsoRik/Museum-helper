import React, { useState } from 'react';

import "./picture-languages.scss";
import { connect } from 'react-redux';
import { changePictureInfo, changeCurrentIndex, triggeredAddLanguageInfo} from '../../../../../../actions/picturesInfoActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import AddLanguageInfo from '../../add-language-info/add-language-info';
import { LANGUAGES_BY_DEV } from '../../../../../../constants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removePictureInfo } from '../../../../../../actions/favoritesActions';

const PictureLanguages = (props) => {

    const { picture, pictureInfo, currentIndex } = props;
    const { setAddLanguageDialogVisible } = props;
    const { changeCurrentIndex, removePictureInfo } = props;
    const [removeConfirmDialogVisilbe, setRemoveConfirmDialogVisilbe] = useState(false);

    const languageItems = pictureInfo.map((info, index) => {
        return <MenuItem key={info.id} value={index} >{LANGUAGES_BY_DEV[info.language]}</MenuItem>
    });
    
    return (
        <div className="picture-languages">
            
            <FormControl variant="outlined" style={{flexGrow: '1'}}>
                <InputLabel id="demo-simple-select-outlined-label">
                Language
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currentIndex}
                    onChange={(e) => changeCurrentIndex(e.target.value)}
                    labelWidth={0}
                >
                    { languageItems }
                </Select>
            </FormControl>
            <Button
                variant="contained" 
                color="primary"
                onClick={() => setAddLanguageDialogVisible(true)}>
                ADD
            </Button>
            <Button
                disabled={currentIndex === -1}
                variant="contained" 
                color="primary"
                onClick={() => setRemoveConfirmDialogVisilbe(true)}>
                REMOVE
            </Button>
            <ConfirmRemoveDialog 
                open={removeConfirmDialogVisilbe}
                setOpen={setRemoveConfirmDialogVisilbe}
                onRemove={() => removePictureInfo(pictureInfo[currentIndex].id)}/>
        </div>
    );
}

const ConfirmRemoveDialog = ({ open, setOpen, onRemove }) => {
    
    return (
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { onRemove(); setOpen(false); }} color="primary">
            Yes, remove it;
          </Button>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
}


const mapStateToProps = (state) => {
    const { currentIndex, picture, pictureInfo } = state.pictureInfo;
    return {
        currentIndex,
        picture,
        pictureInfo
    }
}

export default connect(mapStateToProps, {changeCurrentIndex, removePictureInfo})(PictureLanguages);