import React, { useState } from 'react';
import { connect } from 'react-redux'

import './drawer.scss';
import { closeDrawerCreator, openDrawerCreator } from '../../actions/drawerActions';

const Drawer = (props) => {

    const { opened } = props;
    const { changeVisibleDrawer } = props;
    
    return ( 
        <div 
            className="drawer" 
            style={{minWidth: `${opened ? 280 : 60}px`}}
            onClick={() => changeVisibleDrawer(opened)}>
            DRAWER {opened}
        </div>
     );
}

const mapStateToProps = (state) => {
    const { opened } = state.drawerData;
    return {
        opened
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        changeVisibleDrawer: (opened) => {
            if(opened) closeDrawerCreator(dispatch);
            else openDrawerCreator(dispatch);
        }
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(Drawer);