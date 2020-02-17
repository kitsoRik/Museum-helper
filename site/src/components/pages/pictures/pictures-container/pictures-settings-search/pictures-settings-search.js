import React from 'react';
import { connect } from 'react-redux'
import { TextField, Select, FormControl, MenuItem, InputLabel, Button, IconButton, Menu } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

import './pictures-settings-search.scss';
import { setSearchParams } from '../../../../../actions/picturesActions';
import { debounce } from 'debounce';
const PicturesSettingsSearch = (props) => {
    const { searchText, sortedField, sortedType, museums, museumId, 
        setSearchParam, setSearchParamImmediate } = props;

    return ( 
        <div className="pictures-settings-search">
            <TextField 
                type="search" 
                variant="outlined" 
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => setSearchParam({ searchText: e.target.value })}/>
                <IconButton disabled={sortedField === 'none'} onClick={() => setSearchParamImmediate({ sortedType: ( sortedType === "DESC" ? "ASC" : "DESC" )})}>
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
                </Select>
            </FormControl>
            <FormControl style={{marginLeft: `10px`, flexGrow: "1"}}>
                <InputLabel id="museums-label">Museum</InputLabel>
            <Select value={ museumId } 
                        labelId={"museums-label"}
                        onChange={(e) => setSearchParamImmediate({ museumId: e.target.value })}
                        style={{flexGrow: "1"}}
                    >
                    {
                        museums.map(m =>
                            <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { searchParams: { sortedField, sortedType, museumId} } = state.pictures;
    const { museums } = state.museums;
    return {
        sortedField,
        sortedType,
        museumId,
        museums
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        setSearchParam: debounce((param) => dispatch(setSearchParams(param)), 400),
        setSearchParamImmediate: (param) => dispatch(setSearchParams(param))
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PicturesSettingsSearch);