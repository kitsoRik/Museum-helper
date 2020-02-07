import React from 'react';
import { connect } from 'react-redux'

import { NOT_LOADED, IS_LOADING, ERROR_LOADING } from '../../../../constants';

import "./picture-container.scss";
import { Link, withRouter } from 'react-router-dom';
import PictureItem from '../../../picture-item';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EditIcon from '@material-ui/icons/Edit';
import { compose } from 'redux';

const PicturesContainer = (props) => {

    const { loadingState } = props;

    if(loadingState === NOT_LOADED) return <span>NOT LOADED</span>
    if(loadingState === IS_LOADING) return <span>LOADING...</span>
    if(loadingState === ERROR_LOADING) return <span>ERROR</span>

    const { pictures } = props;

    const pictureItems = pictures.map(item => (
            <PictureItem key={item.id} picture={item} onClick={() => props.history.push(`/pictures/${item.id}`)}/>
    ));

    return ( 
        <div className="picture-container">
            { pictureItems }

            <SpeedDial
                ariaLabel=""
                style={{position: "absolute", bottom: "30px", right: "30px"}}
                hidden={false}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClick={() => props.history.push("/addPicture")}
            >
            </SpeedDial>
        </div>
     );
}

const mapStateToProps = (state) => {

    const { loading, pictures } = state.pictures;
    
    return {
        loadingState: loading,
        pictures
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withRouter
)(PicturesContainer);