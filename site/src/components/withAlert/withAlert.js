import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const withAlert = (WrapperComponent) => {
    class HOC extends Component {
        render() {
            const { alert } = this.props;
            
            return (
                <div style={{display: "flex", height: `calc(100%)`, flexDirection: "column"}}>
                   <div className="alerts-c">
                        {
                            alert.notifications.map((item) => {
                                return <Alert key={item.id} severity={item.alertType === "default" ? "success" : item.alertType} >{ item.text }</Alert>
                            })
                        }
                    </div>
                    <WrapperComponent {...this.props} />
                </div>
            )
        }
    }
    return connect(mapStateToProps, null)(HOC);
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = ({ alert }) => {
    return {
        alert
    }
}

export default withAlert;