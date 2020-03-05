import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import PicturesContainer from './PicturesContainer';

import "./Pictures.scss";
import withGuard from '../../hocs/withGuard';
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawer-actions';

import PictureSettingsSearch from './PicturesContainer/PicturesSettingsSearch';
import PicturesPages from './PicturesPages/PicturesPages';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import AddPictureDialog from './AddPictureDialog';
import AddMuseumLabel from './AddMuseumLabel/AddMuseumLabel';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate/withTranslate';


const Pictures = (props) => {
    const { museumsSize } = props;
    const { searchParams, language } = props;
    const [searchText, setSearchText] = useState(searchParams.searchText);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeDrawerTitle(tr('pictures.title')));
    }, [ language ])

    if(museumsSize === 0) return (
                    <div className="pictures-page">
                        <AddMuseumLabel />
                    </div> );

    return ( 
        <div className="pictures-page">
            <h1>{ tr('pictures.title') }</h1>
            <PictureSettingsSearch 
                searchText={searchText}
                setSearchText={setSearchText}/>
            <PicturesContainer />
            <PicturesPages />
            <AddPictureDialog />
        </div>
     );
}

const mapStateToProps = ({ language, pictures, museums: { museums } }) => {
    const { searchParams, limit, pageNumber } = pictures;
    return {
        searchParams, limit, pageNumber, museumsSize: museums.length,
        language
    }
}
 
export default compose(
    connect(mapStateToProps),
    withGuard,
    withFadeIn,
    withTranslate
)(Pictures);