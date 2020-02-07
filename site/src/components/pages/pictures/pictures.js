import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPicturesCreator } from '../../../actions/picturesActions';


import "./pictures.scss";
import withGuard from '../../withGuard/withGuard';
import withDrawer from '../../withDrawer';
import { compose } from 'redux';
import { changeDrawerTitleCreator } from '../../../actions/drawerActions';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EditIcon from '@material-ui/icons/Edit';


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

const AddButton = (props) => {
    return (
    <SpeedDial
        ariaLabel=""
        style={{position: "absolute", bottom: "15px", right: "15px"}}
        hidden={false}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
      </SpeedDial>
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