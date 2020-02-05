import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core';
import { addLanguageInfoCreator } from '../../../../actions/picturesInfoActions';

const AddLanguageInfo = (props) => {

    const { id, addLanguage } = props;

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
                onClick={() => addLanguage(id, title, description, language)}
            >Add</Button>
        </div>
     );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        id: state.pictureInfo.picture.id
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        addLanguage: (id, title, description, language) => dispatch(addLanguageInfoCreator(id, title, description, language)),
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(AddLanguageInfo);