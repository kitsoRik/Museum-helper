import React from 'react';
import { tr } from '../../../../services/i18n/i18n';
import withTranslate from '../../../hocs/withTranslate';

const AddMuseumLabel = (props) => {
    return ( 
        <div>
            { tr('pictures.addMuseumLabel') }
        </div>
     );
}

export default withTranslate(AddMuseumLabel);