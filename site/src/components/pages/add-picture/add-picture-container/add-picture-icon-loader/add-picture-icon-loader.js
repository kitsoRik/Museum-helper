import React, { useState }  from 'react';

import './add-picture-icon-loader.scss';

const AddPictureIconLoader = (props) => {
    
    const { setFile } = props;
    const [ progress, setProgress ] = useState(0);

    const startLoadIcon = () => {
        const inputFile = document.getElementById("file-loader");

        inputFile.click();

        inputFile.onchange = () => {
            const imageView = document.getElementById("image-viever");
            var reader = new FileReader();
            reader.onprogress = (e) => setProgress(e.loaded / e.total * 100);
            reader.onload = ((i) => (e) => i.src = e.target.result)(imageView);
            reader.readAsDataURL(inputFile.files[0]);
            setFile(inputFile.files[0]);
        };
    }

    return ( 
        <div
            className="add-picture-icon-loader" 
            onClick={startLoadIcon}
        >
            <input 
                id="file-loader"
                type="file"
                name="icon"
                style={{display: "none"}}/>
            <img id="image-viever" alt={progress}/>
        </div>
     );
}

export default AddPictureIconLoader;