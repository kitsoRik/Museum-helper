import React, { useState, useEffect } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';
import Axios from 'axios';
import { savePictureInfo } from '../../../../../services/api/api';

const PictureDescriptionContainer = (props) => {

    const { index } = props;
    const { picture, pictureInfo } = props;
    const [description, setDescription] = useState("");
    const [editable, setEditable] = useState(false);
    
    useEffect(() => {
        setDescription(pictureInfo[index].description);
    }, [index]);

    if(index === -1) {
        return <span>Select language</span>;
    }
    
    const editButton = editable ? null : <button 
                        className="picture-descriptipn-edit-button"
                        onClick={() => setEditable(!editable)}
                        > Edit </button>
    const onBlur = (text) => {
        setDescription(text)
        savePictureInfo({
            id: pictureInfo[index].id,
            description: text
        });
        setEditable(false);
    }

    return ( 
        <div 
            className="picture-description-container editable"
            contentEditable={editable}
            onBlur={(e) => onBlur(e.target.innerText)}
        >
            { description } 
            { editButton }
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureDescriptionContainer);