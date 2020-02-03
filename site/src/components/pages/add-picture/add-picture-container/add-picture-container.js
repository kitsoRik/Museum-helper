import React, { useState } from 'react';

import './add-picture-container.scss';
import AddPictureIconLoader from './add-picture-icon-loader/add-picture-icon-loader';
import { addPicture } from '../../../../services/api/api';
import { withRouter } from 'react-router-dom';

const AddPictureContainer = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [qrcode, setQrcode] = useState("");
    const [file, setFile] = useState(null);

    const onAddPicture = () => {
        addPicture(name, description, qrcode, file)
            .then((data) => {
                if(data.success) {
                    props.history.push("/pictures");
                }
            });
    }
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

export default withRouter(AddPictureContainer);