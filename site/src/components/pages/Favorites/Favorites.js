import React, { useEffect } from 'react';
import FavoritesContainer from './FavoritesContainer';
import { connect } from 'react-redux'

import './Favorites.scss';
import { LOADED } from '../../../constants';
import { loadFavotires } from '../../../actions/favorites-actions';
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawer-actions';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';

const Favorites = (props) => {

    const { loadFavotires } = props;
    const { loading, language } = props;
    const { changeDrawerTitle } = props;

    useEffect(() => {
        changeDrawerTitle(tr('favorites.title'));
        loadFavotires();
    }, [ language ]);

    if(loading !== LOADED) return <span>WAIT</span>;


    return (
        <div className="favorites-page">
            <FavoritesContainer />
        </div>
    );
}

const mapStateToProps = ({ language, favorites: { loading, groups }}) => {
    return {
        loading,
        groups,
        language
    }
}

export default compose(
    connect(mapStateToProps, { loadFavotires, changeDrawerTitle }),
    withFadeIn,
    withTranslate
)(Favorites);