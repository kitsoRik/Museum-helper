import React from 'react';
import { connect } from 'react-redux'
import MuseumItem from './MuseumItem/MuseumItem';

import './MuseumItemsContainer.scss';

const MuseumItemsContainer = (props) => {

    const { museums } = props;

    const museumsItems = museums.map(m => {
        return (
            <MuseumItem key={m.id} museum={m}/>
        )
    });

    return ( 
        <div className="museum-items-container">
            { museumsItems }
        </div>
     );
}

const mapStateToProps = ({ museums: { museums }}) => ({
    museums
});

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(MuseumItemsContainer);