import React, { useState, useEffect } from 'react';

import './picture-description-container.scss';
import { connect } from 'react-redux';

const PictureDescriptionContainer = (props) => {

    const { index } = props;
    const { onPictureInfoChanged, pictureInfo } = props;
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
        onPictureInfoChanged(index, text)
        setEditable(false);
    }

    return ( 
        <div 
            className="picture-description-container"
            contentEditable={editable}
            suppressContentEditableWarning={true}
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