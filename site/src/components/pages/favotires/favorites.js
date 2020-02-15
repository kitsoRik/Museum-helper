import React, { useState, useEffect } from 'react';
import FavoritesContainer from './favotires-container';
import { connect } from 'react-redux'

import './favorites.scss';
import { NOT_LOADED, LOADED } from '../../../constants';
import { loadFavotires } from '../../../actions/favoritesActions';
import { compose } from 'redux';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';

const Favorites = (props) => {

    const { loadFavotires } = props;
    const { loading } = props;
    const { startGetFavorites } = props;

    useEffect(() => {
        loadFavotires();
    }, [ ]);

    if(loading !== LOADED) return <span>WAIT</span>;


    return (
        <div className="favorites-page">
            <FavoritesContainer />
        </div>
    );
}

const mapStateToProps = ({ favorites: { loading, groups }}) => {
    return {
        loading,
        groups
    }
}

export default compose(
    connect(mapStateToProps, { loadFavotires }),
    withFadeIn
)(Favorites);