import React, { useState } from 'react';
import { connect } from 'react-redux'

import './drawer.scss';
import { changeVisibleDrawerCreator } from '../../actions/drawerActions';

const Drawer = (props) => {

    const { opened } = props;
    const { changeVisibleDrawer } = props;
    
    return ( 
        <div 
            className="drawer" 
            style={{minWidth: `${opened ? 280 : 60}px`}}
            onClick={() => changeVisibleDrawer()}>
            DRAWER {opened}
        </div>
     );
}

const mapStateToProps = (state) => {
    const { opened } = state.drawer;
    return {
        opened
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        changeVisibleDrawer: () => dispatch(changeVisibleDrawerCreator())
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(Drawer);