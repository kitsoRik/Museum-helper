import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { loadMuseum } from '../../../actions/museum-actions';
import { IS_LOADING, LOADED_ERROR } from '../../../constants';
import { CircularProgress } from '@material-ui/core';
import MuseumContainer from './MuseumContainer/MuseumContainer';

import './Museum.scss';

const Museum = (props) => {
    const { match: { params: { id } }} = props;
    const { loadMuseum } = props;

    useEffect(() => {
        loadMuseum(id);
    }, [ ]);
    const { loading } = props;

    if(loading === IS_LOADING) return <CircularProgress />
    if(loading === LOADED_ERROR) return <span>Error</span>

    return ( 
        <div className="museum-page">
            <MuseumContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    const { loading } = state.museum;
    return {
        loading
    }
}

export default compose(
    connect(mapStateToProps, { loadMuseum }),
    withRouter
)(Museum);