import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPicturesCreator } from '../../../actions/picturesActions';

import "./pictures.scss";
import withGuard from '../../withGuard/withGuard';
import { compose } from 'redux';
import { changeDrawerTitleCreator } from '../../../actions/drawerActions';

import PictureSettingsSearch from './pictures-container/pictures-settings-search';
import PicturesPages from './PicturesPages/PicturesPages';


const Pictures = (props) => {
    const { beginLoadPictures } = props;
    const dispatch = useDispatch();
    const { searchParams, limit } = props;
    const [pageNumber, setPageNumber] = useState(1);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(changeDrawerTitleCreator("Pictures"));
    }, [ ])

    useEffect(() => {
        beginLoadPictures(searchParams, limit, pageNumber);
    }, [searchParams, pageNumber, limit]);

    return ( 
        <div className="pictures-page">
            <h1>Pictures</h1>
            <PictureSettingsSearch 
                searchText={searchText}
                setSearchText={setSearchText}/>
            <PicturesContainer />
            <PicturesPages 
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}/>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { searchParams, limit, pageNumber } = state.pictures;
    return {
        searchParams, limit, pageNumber
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        beginLoadPictures: (params, limit, pageNumber) => dispatch(startLoadPicturesCreator(params, limit, pageNumber))
    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withGuard
)(Pictures);