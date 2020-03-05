import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {  Button, Select, InputLabel, MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { addLanguageInfo } from '../../../../../actions/pictures-info-actions';
import { LANGUAGES } from '../../../../../constants';
import { compose } from 'redux';
import withTranslate from '../../../../hocs/withTranslate';
import { tr } from '../../../../../services/i18n/i18n';

const AddLanguageInfo = (props) => {

    const { visible, setVisible } = props;
    const { id, pictureInfo, addLanguageInfo } = props;
    
    const [language, setLanguage] = useState("");

    useEffect(() => {
        setLanguage("");
    }, [ visible ]);

    return ( 
        <Dialog
            fullWidth={true}
            open={visible} 
            onClose={() => setVisible(false)}
        >
            <DialogTitle>{ tr('picture.addLanguageInfo.title') }</DialogTitle>
            <DialogContent style={{display: "flex"}}>
            <FormControl style={{flexGrow: "1"}}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    { tr('constants.language') }
                </InputLabel>
                <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={language}
                displayEmpty
                onChange={(e) => setLanguage(e.target.value) }
                >
                <MenuItem value="">
                    { tr('constants.none') }
                </MenuItem>
                {
                    LANGUAGES.filter(l => !pictureInfo.map(i => i.language).includes(l.dev)).map(l => {
                        return <MenuItem key={l.dev} value={l.dev}>{ l.prod }</MenuItem>
                    })
                }
                </Select>
            </FormControl>
            </DialogContent>
            
            <DialogActions style={{justifyContent: "center"}}>
            <Button 
                disabled={language === ''}
                variant="contained"
                onClick={() => {setVisible(false); addLanguageInfo(id, "", "", language)}}
            >{ tr('constants.add') }</Button>
            </DialogActions>
        </Dialog>
     );
}

const mapStateToProps = (state) => {
    const { picture: { id }, pictureInfo } = state.pictureInfo;
    return {
        id,
        pictureInfo
    }
}
 
export default compose(
    connect(mapStateToProps, { addLanguageInfo }),
    withTranslate
)(AddLanguageInfo);