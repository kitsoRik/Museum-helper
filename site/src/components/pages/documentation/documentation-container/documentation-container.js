import React from 'react';
import { Link } from 'react-router-dom';

import './DocumentationContainer.scss';
import { tr, trx } from '../../../../services/i18n/i18n';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withTranslate from '../../../hocs/withTranslate/withTranslate';

const DocumentationContainer = (props) => {
    return ( 
        <div className="documentation-container">
            <div>
                <span className="documentation-subtitle">{ tr('documentation.what') }</span>
                <p className="documentation-text">
                     { tr('documentation.whatDescribe') }
                </p>
            </div>
            <div>
                <span className="documentation-subtitle">{ tr('documentation.howToUse.title') }</span>
                <br />
                <span className="documentation-text">{ tr('documentation.howToUse.description') }
                    <ul>
                        <li>{ tr('documentation.howToUse.list.1') }</li>  
                        <li>{ tr('documentation.howToUse.list.2') }</li>  
                        <li>{ tr('documentation.howToUse.list.3') }</li>
                    </ul> 
                </span>
            </div>
            <div>
                <span className="documentation-subtitle">{ tr('documentation.createMuseum.title') }</span>
                <p className="documentation-text">
                    { trx('documentation.createMuseum.description', {
                        link: <Link to="/museums">{ tr('museums.title') }</Link>
                    }) }
                </p>
            </div>
            <div>
                <span className="documentation-subtitle">{ tr('documentation.addPicture.title') }</span>
                <p className="documentation-text">{ trx('documentation.addPicture.description', {
                    link: <Link to ="/pictures">{ tr('pictures.title') }</Link>
                }) }</p>
            </div>
            <div>
                <span className="documentation-subtitle">{ tr('documentation.release.title') }</span>
                <p className="documentation-text">{ tr('documentation.release.description') }</p>
            </div>
        </div>
     );
}

export default compose(
    connect(),
    withTranslate
)(DocumentationContainer);