import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core';
import { addLanguageInfo } from '../../../../../actions/picturesInfoActions';

const AddLanguageInfo = (props) => {

    const { id, addLanguageInfo } = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");

    return ( 
        <div className="picture-add-language-panel">
            <TextField 
                label="Name"
                onChange={(e) => setTitle(e.target.value)}/>
            <TextField 
                label="Description"
                onChange={(e) => setDescription(e.target.value)}/>
            <TextField 
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}/>
            <Button 
                variant="contained"
                onClick={() => addLanguageInfo(id, title, description, language)}
            >Add</Button>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        id: state.pictureInfo.picture.id
    }
}
 
export default connect(mapStateToProps, { addLanguageInfo })(AddLanguageInfo);