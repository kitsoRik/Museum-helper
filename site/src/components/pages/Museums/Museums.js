import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import withGuard from '../../hocs/withGuard';
import MuseumsContainer from './MuseumsContainer';

import './Museums.scss';
import withFadeIn from '../../hocs/withFadeIn';
import { changeDrawerTitle } from '../../../actions/drawerActions';

const Museums = ({ changeDrawerTitle }) => {
    useEffect(() => {
        changeDrawerTitle("Museums");
    }, [ ])

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
    connect(mapStateToProps, { changeDrawerTitle }),
    withGuard,
    withFadeIn
)(Museums);