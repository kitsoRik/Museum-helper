import React from 'react';
import { connect } from 'react-redux'

import PictureItem from './picture-item'
import { NOT_LOADED, IS_LOADING, LOADED, ERROR_LOADING } from '../../../../constants';

import "./picture-container.scss";

const PicturesContainer = (props) => {

    const { loadingState } = props;

    if(loadingState === NOT_LOADED) return <span>NOT LOADED</span>
    if(loadingState === IS_LOADING) return <span>LOADING...</span>
    if(loadingState === ERROR_LOADING) return <span>ERROR</span>

    const { pictures } = props;

    const pictureItems = pictures.map(item => <PictureItem  {...item}/>)

    return ( 
        <div className="picture-container">
            { pictureItems }
            <div className="picture-item add-picture-item">
                +
            </div>
        </div>
     );
}

const mapStateToProps = (state) => {

    const { loading, pictures } = state.picturesData;

    return {
        loadingState: loading,
        pictures
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PicturesContainer);