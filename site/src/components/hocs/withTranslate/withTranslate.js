import React, { Component } from 'react';
import { connect } from 'react-redux';

const withTranslate = (WrapperComponent) => {
    class HOC extends Component {
        render() {
            return <WrapperComponent {...this.props}/>
        }
    }
    return connect(mapStateToProps)(HOC);
}

const mapStateToProps = ({ language }) =>  ({ language })

export default withTranslate;