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
import AddMuseumLabel from './AddMuseumLabel/AddMuseumLabel';


const Pictures = (props) => {
    const { museumsSize, startLoadPictures } = props;
    const dispatch = useDispatch();
    const { searchParams } = props;
    const [searchText, setSearchText] = useState(searchParams.searchText);

    useEffect(() => {
        dispatch(changeDrawerTitle("Pictures"));
    }, [ ])

    if(museumsSize === 0) return (
                    <div className="pictures-page">
                        <AddMuseumLabel />
                    </div> );

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
    const { museums } = state.museums;
    return {
        searchParams, limit, pageNumber, museumsSize: museums.length
    }
}
 
export default compose(
    connect(mapStateToProps, { startLoadPictures }),
    withGuard,
    withFadeIn
)(Pictures);