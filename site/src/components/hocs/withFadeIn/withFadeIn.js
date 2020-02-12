import React, { Component } from 'react';
import { Fade } from '@material-ui/core';

const withFadeIn = (WrapperComponent) => {
    return class extends Component {
        render() { 
            return (
                <Fade in={true} timeout={700}>
                    <div style={{width: `100%`, height: `100%`}}>
                        <WrapperComponent {...this.props}/>
                    </div>
                </Fade>        
            )
        }
    }
}
export default withFadeIn;