import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import withGuard from '../../hocs/withGuard';
import MuseumsContainer from './MuseumsContainer';

import './Museums.scss';

const Museums = (props) => {
    return ( 
        <div className="museums-page">
            <MuseumsContainer />
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
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withGuard
)(Museums);