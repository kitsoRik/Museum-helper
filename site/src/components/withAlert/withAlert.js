import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const withAlert = (WrapperComponent) => {
    class HOC extends Component {
        render() {
            const { alert } = this.props;
            
            return (
                <div style={{display: "flex", height: "100%"}}>
                   <div className="alerts-c">
                        {
                            alert.notifications.map((item) => {
                                return <Alert>{ item.text }</Alert>
                            })
                        }
                    </div>
                    <WrapperComponent {...this.props} />
                </div>
            )
        }
    }
    return connect(mapStateToProps, mapDipatchToProps)(HOC);
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = ({ alert }) => {
    return {
        alert
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default withAlert;