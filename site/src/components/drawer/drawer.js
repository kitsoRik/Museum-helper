import React, { useState } from 'react';
import { connect } from 'react-redux'

import './drawer.scss';

const Drawer = (props) => {

    const [w, setW] = useState(280);

    return ( 
        <div 
            className="drawer" 
            style={{width: `${w}px`}}    
            onClick={() => setW(300 - w)}>
            DRAWER {w}
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
 
export default connect(mapStateToProps, mapDipatchToProps)(Drawer);