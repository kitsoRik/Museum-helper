import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPicturesCreator } from '../../../actions/picturesActions';


import "./pictures.scss";
import withGuard from '../../withGuard/withGuard';
import { compose } from 'redux';
import { changeDrawerTitleCreator } from '../../../actions/drawerActions';

import PictureSettingsSearch from './pictures-container/pictures-settings-search';
import { debounce } from 'debounce';


const Pictures = (props) => {
    const { beginLoadPictures } = props;
    const dispatch = useDispatch();
    const { searchParams } = props;
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(changeDrawerTitleCreator("Pictures"));
    }, [ ])

    useEffect(() => {
        beginLoadPictures(searchParams);
    }, [searchParams]);

    return ( 
        <div className="pictures-page">
            <h1>Pictures</h1>
            <PictureSettingsSearch 
                searchText={searchText}
                setSearchText={setSearchText}/>
            <PicturesContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    const { searchParams } = state.pictures;
    return {
        searchParams
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        beginLoadPictures: (params) => dispatch(startLoadPicturesCreator(params))
    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withGuard
)(Pictures);