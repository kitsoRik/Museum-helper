import React from 'react';
import { connect } from 'react-redux'

import './MuseumItem.scss';
import { Button } from '@material-ui/core';

const MuseumItem = (props) => {

    const { museum } = props;

    return ( 
        <div className="museum-item">
            { museum.name }

            <Button variant="outlined">
                View pictures
            </Button>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(MuseumItem);