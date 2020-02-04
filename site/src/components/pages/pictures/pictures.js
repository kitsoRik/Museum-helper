import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPicturesCreator } from '../../../actions/picturesActions';


import "./pictures.scss";
import withGuard from '../../withGuard/withGuard';

const Pictures = (props) => {

    const { beginLoadPictures } = props;

    useEffect(() => {
        beginLoadPictures();
    }, [ ])

    return ( 
        <div className="pictures-page">
            <h1>Pictures</h1>
            <PicturesContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        beginLoadPictures: () => dispatch(startLoadPicturesCreator(dispatch))
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)((withGuard(Pictures)));