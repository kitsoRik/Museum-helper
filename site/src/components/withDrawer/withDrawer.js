import React, { Component } from 'react';
import MainDrawer from '../MainDrawer';

import './withDrawer.scss';

const withDrawer = (WrapperComponent) => {
    return class extends Component {
        render() { 
            return ( 
                <MainDrawer main={<WrapperComponent {...this.props}/>}/>
            )
        }
    }
}
export default withDrawer;