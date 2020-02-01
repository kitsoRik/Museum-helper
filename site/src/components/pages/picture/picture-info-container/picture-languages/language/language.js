import React from 'react';

import './language.scss';

const Language = (props) => {
    const { language, current } = props;
    const { onClick } = props;

    const className = `picture-languages-language ${current ? `picture-languages-language-current` : ""}`;

    return (
        <h4 
            className={className}
            onClick={onClick}>
            { language }
        </h4>
    )
}

export default Language;