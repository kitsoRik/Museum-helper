import React from 'react';

import './add-picture.scss';
import AddPictureContainer from './add-picture-container/add-picture-container';

const AddPicture = (props) => {
    return ( 
        <div className="add-picture">
            <h1 
                className="add-picture-title"
            >Add picture</h1>
            <AddPictureContainer />
        </div>
     );
}

export default AddPicture;