import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { loadMuseums } from '../../../../actions/museumsActions';
import MuseumItemsContainer from './MuseumItemsContainer';

import './MuseumsContainer.scss';

const MuseumsContainer = (props) => {
    const { museums } = props;
    const { loadMuseums } = props;

    useEffect(() => {
        loadMuseums();
    }, [ ]);

    return ( 
        <div className="museums-container">
            <MuseumItemsContainer />
        </div>
     );
}

const mapStateToProps = ({ museums: { museums }}) => ({
    museums
});
 
export default connect(mapStateToProps, { loadMuseums })(MuseumsContainer);