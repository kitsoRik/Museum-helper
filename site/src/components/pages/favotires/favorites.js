import React, { useState, useEffect } from 'react';
import FavoritesContainer from './favotires-container';
import { connect } from 'react-redux'

import './favorites.scss';
import { NOT_LOADED, LOADED } from '../../../constants';
import { loadFavotires } from '../../../actions/favoritesActions';

const Favorites = (props) => {

    const { loading } = props;
    const { startGetFavorites } = props;

    useEffect(() => {
        startGetFavorites();
    }, [ ]);

    if(loading !== LOADED) return <span>WAIT</span>;


    return (
        <div className="favotires-page">
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

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        startGetFavorites: () => dispatch(loadFavotires())
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(Favorites);