import React, { useState, useEffect } from 'react';
import FavoritesContainer from './favotires-container';
import { connect } from 'react-redux'

import './favorites.scss';
import { NOT_LOADED, LOADED } from '../../../constants';
import { loadFavotires } from '../../../actions/favoritesActions';
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawerActions';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';

const Favorites = (props) => {

    const { loadFavotires } = props;
    const { loading, language } = props;
    const { startGetFavorites, changeDrawerTitle } = props;

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