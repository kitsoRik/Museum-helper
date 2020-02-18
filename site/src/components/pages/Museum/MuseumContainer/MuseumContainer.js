import React from 'react';
import { connect } from 'react-redux'
import { TextField, Grid, CircularProgress } from '@material-ui/core';

import './MuseumContainer.scss';
import { AccountCircle } from '@material-ui/icons';
import { changeMuseumData } from '../../../../actions/museumActions';

const MuseumContainer = (props) => {
    const { id, name, location } = props;
    const { changingFields, changeMuseumData, notChangedField } = props;
    
    return ( 
        <div className="museum-container">
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{position: "relative", display: "flex"}}>
                    <AccountCircle />
                    { changingFields.includes("name") && <CircularProgress style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}/>}
                </Grid>
                <Grid item style={{display: "flex", flexGrow: "1"}}>
                    <TextField
                        style={{flexGrow: "1"}} 
                        label="Name"
                        defaultValue={name}
                        error={notChangedField.includes("name")}
                        disabled={changingFields.includes("name")}
                        onBlur={(e) => changeMuseumData(id, { name: e.target.value })} />
               </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{position: "relative", display: "flex"}}>
                    <AccountCircle />
                    { changingFields.includes("location") && <CircularProgress style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}/>}
                </Grid>
                <Grid item style={{display: "flex", flexGrow: "1"}}>
                    <TextField 
                        style={{flexGrow: "1"}} 
                        label="Location"
                        error={notChangedField.includes("location")}
                        defaultValue={location}
                        disabled={changingFields.includes("location")}
                        onBlur={(e) => changeMuseumData(id, { location: e.target.value })} />
                </Grid>
            </Grid>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { id, name, location, changingFields, notChangedField } = state.museum;
    return {
        id,
        name, 
        location,
        changingFields,
        notChangedField
    }
}
 
export default connect(mapStateToProps, { changeMuseumData })(MuseumContainer);