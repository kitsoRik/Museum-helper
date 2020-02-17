import React from 'react';
import { connect } from 'react-redux'

import { NOT_LOADED, IS_LOADING, ERROR_LOADING } from '../../../../constants';

import "./pictures-container.scss";
import { withRouter } from 'react-router-dom';
import PictureItem from '../../../picture-item';
import { compose } from 'redux';
import { CircularProgress } from '@material-ui/core';
import { addPicture } from '../../../../actions/picturesActions';

const PicturesContainer = (props) => {

    const { loadingState } = props;

    if(loadingState === NOT_LOADED) return <span>NOT LOADED</span>
    if(loadingState === IS_LOADING) return ( 
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: '1'}}>
            <CircularProgress/>
        </div> 
        );
    if(loadingState === ERROR_LOADING) return <span>ERROR</span>

    const { pictures } = props;

    const pictureItems = pictures.map(item => (
            <PictureItem key={item.id} picture={item} onClick={() => props.history.push(`/pictures/${item.id}`)}/>
    ));

    return ( 
        <div className="pictures-container">
            { pictureItems }
        </div>
     );
}

const mapStateToProps = (state) => {
    const { loading, pictures } = state.pictures;
    const { museums } = state.museums;
    
    return {
        loadingState: loading,
        pictures,
        museums
    }
}
 
export default compose(
    connect(mapStateToProps, { addPicture }),
    withRouter
)(PicturesContainer);