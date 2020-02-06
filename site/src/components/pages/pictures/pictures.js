import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPicturesCreator } from '../../../actions/picturesActions';


import "./pictures.scss";
import withGuard from '../../withGuard/withGuard';
import withDrawer from '../../withDrawer';
import { compose } from 'redux';
import { changeDrawerTitleCreator } from '../../../actions/drawerActions';

const Pictures = (props) => {

    const { beginLoadPictures } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        beginLoadPictures();
        dispatch(changeDrawerTitleCreator("Pictures"));
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
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withGuard
)(Pictures);