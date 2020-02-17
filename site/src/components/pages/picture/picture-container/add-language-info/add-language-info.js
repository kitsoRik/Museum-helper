import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { addLanguageInfo } from '../../../../../actions/picturesInfoActions';
import { LANGUAGES } from '../../../../../constants';

const AddLanguageInfo = (props) => {

    const { visible, setVisible } = props;
    const { id, pictureInfo, addLanguageInfo } = props;
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");

    return ( 
        <Dialog
            fullWidth={true}
            open={visible} 
            onClose={() => setVisible(false)}
        >
            <DialogTitle >Add picture</DialogTitle>
            <DialogContent style={{display: "flex"}}>
            <FormControl style={{flexGrow: "1"}}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Age
                </InputLabel>
                <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={language}
                displayEmpty
                onChange={(e) => setLanguage(e.target.value) }
                >
                <MenuItem value="">
                    None
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
                variant="contained"
                onClick={() => {setVisible(false); addLanguageInfo(id, title, description, language)}}
            >Add</Button>
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
 
export default connect(mapStateToProps, { addLanguageInfo })(AddLanguageInfo);