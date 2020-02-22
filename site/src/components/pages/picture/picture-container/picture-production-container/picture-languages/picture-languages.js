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
import { tr } from '../../../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../../../hocs/withTranslate';

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
                { tr('constants.language') }
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
                { tr('constants.add') }
            </Button>
            <Button
                disabled={currentIndex === -1}
                variant="contained" 
                color="primary"
                onClick={() => setRemoveConfirmDialogVisilbe(true)}>
                { tr('constants.remove') }
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
        <DialogTitle id="alert-dialog-title">{ tr('picture.removeDialog.title') }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { tr('picture.removeDialog.description') }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { onRemove(); setOpen(false); }} color="primary">
            { tr('picture.removeDialog.yes') }
          </Button>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            { tr('picture.removeDialog.cancel') }
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

export default compose(
  connect(mapStateToProps, {changeCurrentIndex, removePictureInfo}),
  withTranslate
)(PictureLanguages);