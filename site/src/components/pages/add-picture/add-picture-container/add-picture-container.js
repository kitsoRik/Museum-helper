import React, { useState } from 'react';

import './add-picture-container.scss';
import AddPictureIconLoader from './add-picture-icon-loader/add-picture-icon-loader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPictureCreator } from '../../../../actions/picturesActions';

const AddPictureContainer = (props) => {

    const { addPicture } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [qrcode, setQrcode] = useState("");
    const [file, setFile] = useState(null);

    const onAddPicture = () => addPicture(name, description, qrcode, file, props.history);

    return ( 
        <div className="add-picture-container">
            <label 
                className="add-picture-container-label"
            >Name (developer)</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <label 
                className="add-picture-container-label"
            >Description (developer)</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
            <label 
                className="add-picture-container-label"
            >QR Code</label>
            <input type="text" onChange={(e) => setQrcode(e.target.value)} />
            <AddPictureIconLoader file={file} setFile={setFile} />
            <button 
                disabled={!(name.length !== 0 && description.length !== 0 && qrcode.length !== 0 && !!file)}
                onClick={() => onAddPicture()}>Add</button>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        addPicture: (name, description, qrcode, file, history) => 
            dispatch(addPictureCreator(name, description, qrcode, file, history))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(withRouter(AddPictureContainer));