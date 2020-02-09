import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { TextField, Select, FormControl, MenuItem, InputLabel, Button, IconButton, Menu } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

import './pictures-settings-search.scss';
import { setSearchParams } from '../../../../../actions/picturesActions';
import { debounce } from 'debounce';
const PicturesSettingsSearch = (props) => {
    const { searchText, sortedField, sortedType, 
        setSearchParam, setSearchParamImmediate } = props;

    return ( 
        <div className="pictures-settings-search">
            <TextField 
                type="search" 
                variant="outlined" 
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => setSearchParam({ searchText: e.target.value })}/>
                <IconButton onClick={() => setSearchParamImmediate({ sortedType: ( sortedType === "DESC" ? "ASC" : "DESC" )})}>
                    <SortIcon style={{transform:`scale(1, ${sortedType === "ASC" ? 1 : -1})`}}/>
                </IconButton>
            <FormControl style={{flexGrow: "1"}}>
                
                <InputLabel id="sort-label">Sort field</InputLabel>
                <Select value={ sortedField } 
                        labelId="sort-label" 
                        style={{flexGrow: "1"}}
                        onChange={(e) => setSearchParamImmediate({ sortedField: e.target.value })}>
                    <MenuItem value='none'>None</MenuItem>
                    <MenuItem value='name'>Name</MenuItem>
                    <MenuItem value='description'>Description</MenuItem>
                    <MenuItem value='created'>Created</MenuItem>
                    <MenuItem value='changed'>Changed</MenuItem>
                </Select>
            </FormControl>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { searchParams: { sortedField, sortedType }} = state.pictures;
    return {
        sortedField,
        sortedType
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        setSearchParam: debounce((param) => dispatch(setSearchParams(param)), 400),
        setSearchParamImmediate: (param) => dispatch(setSearchParams(param))
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PicturesSettingsSearch);