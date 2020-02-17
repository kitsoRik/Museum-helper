import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPictures } from '../../../actions/picturesActions';

import "./pictures.scss";
import withGuard from '../../hocs/withGuard';
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawerActions';

import PictureSettingsSearch from './pictures-container/pictures-settings-search';
import PicturesPages from './PicturesPages/PicturesPages';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import AddPictureDialog from './AddPictureDialog';


const Pictures = (props) => {
    const { startLoadPictures } = props;
    const dispatch = useDispatch();
    const { searchParams } = props;
    const [searchText, setSearchText] = useState(searchParams.searchText);

    useEffect(() => {
        dispatch(changeDrawerTitle("Pictures"));
    }, [ ])

    useEffect(() => {
        startLoadPictures();
    }, [ ]);

    return ( 
        <div className="pictures-page">
            <h1>Pictures</h1>
            <PictureSettingsSearch 
                searchText={searchText}
                setSearchText={setSearchText}/>
            <PicturesContainer />
            <PicturesPages />
            <AddPictureDialog />
        </div>
     );
}

const mapStateToProps = (state) => {
    const { searchParams, limit, pageNumber } = state.pictures;
    return {
        searchParams, limit, pageNumber
    }
}
 
export default compose(
    connect(mapStateToProps, { startLoadPictures }),
    withGuard,
    withFadeIn
)(Pictures);