import React from 'react';

import "./picture-languages.scss";
import Language from './language';

const PictureLanguages = (props) => {

    const { pictureInfo, languageIndex, setLanguageIndex } = props;
    const { onLanguageAdded } = props;
    const languageItems = pictureInfo.map((info, index) => {
        return <Language 
            key={info.language} 
            language={info.language}
            current={languageIndex === index}
            onClick={() => setLanguageIndex(index)}/>
    });

    return ( 
        <div className="picture-languages">
            <div className="picture-languages-container">
                { languageItems }
            </div>
            <div 
                className="picture-languages-add"
                onClick={() => onLanguageAdded(prompt("Whick language add? (en, ru, ua):"))}
            >
                +
            </div>
        </div>
     );
}

export default PictureLanguages;