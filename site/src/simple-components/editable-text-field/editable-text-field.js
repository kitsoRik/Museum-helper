import React, { useState, useEffect } from 'react';

import './editable-text-field.scss';

const EditableTextField = (props) => {


    let editableTextField; // ref

    const { value, classname = ""} = props;
    const { onSaved = () => {}} = props;

    const [text, setText] = useState(value);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setText(value);
    }, [ value ]);

    useEffect(() => {
        if(editable) {
            editableTextField.focus();
        }
    }, [ editable ])

    const onSave = () => {
        onSaved(editableTextField.innerText);
        setEditable(false);
    }

    return ( 
        <div className={"editable-text-field " + classname}  ref={(i) => {editableTextField = i}}
            contentEditable={editable.toString()}
            suppressContentEditableWarning="true"
            onKeyPress={(e) => { 
                if(e.which === 13 || e.keyCode === 13) {
                    editableTextField.blur();
                    e.preventDefault();
                }
            }}
            onClick={() => setEditable(true)}
            onBlur={() => onSave()}>
            { value }
        </div>
     );
}

export default EditableTextField;