import React, { Component } from 'react';
import Drawer from '../drawer';

import './withDrawer.scss';

const withDrawer = (WrapperComponent) => {
    return class extends Component {
        render() { 
            return ( 
                <div 
                    className="app-with-drawer"
                    style={{minWidth: "10px"}}    
                >
                    <Drawer />
                    <WrapperComponent {...this.props}/>
                </div>
            )
        }
    }
}
export default withDrawer;