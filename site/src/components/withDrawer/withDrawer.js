import React, { Component } from 'react';
import Drawer from '../drawer';

import './withDrawer.scss';

const withDrawer = (WrapperComponent) => {
    return class extends Component {
        render() { 
            return ( 
                <Drawer main={<WrapperComponent {...this.props}/>}/>
            )
        }
    }
}
export default withDrawer;