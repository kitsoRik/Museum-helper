import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TextField, Select, FormControl, MenuItem, InputLabel, Button, IconButton, Menu } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

import './pictures-settings-search.scss';
import { setSearchParams } from '../../../../../actions/picturesActions';
import { debounce } from 'debounce';
import { tr } from '../../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../../hocs/withTranslate/withTranslate';
const PicturesSettingsSearch = (props) => {
    const { searchText, sortedField, sortedType, museums, museumId, updateId, 
        setSearchParam, setSearchParamImmediate } = props;

    let currentMuseumUpdatesLength = (museums.length === 0 || museumId === -1) ? 0 : museums.find(m => m.id === museumId).updateId;

    return ( 
        <div className="pictures-settings-search">
            <TextField 
                disabled={museumId === -1}
                type="search" 
                variant="outlined" 
                placeholder={ tr('pictures.searchPlaceholder')}
                defaultValue={searchText}
                onChange={(e) => setSearchParam({ searchText: e.target.value })}/>
                <IconButton disabled={sortedField === 'none'} onClick={() => setSearchParamImmediate({ sortedType: ( sortedType === "DESC" ? "ASC" : "DESC" )})}>
                    <SortIcon style={{transform:`scale(1, ${sortedType === "ASC" ? 1 : -1})`}}/>
                </IconButton>
            <FormControl 
                style={{flexGrow: "1"}} 
                disabled={museumId === -1}>
                <InputLabel id="sort-label">{ tr('pictures.sortField') }</InputLabel>
                <Select value={ sortedField } 
                        labelId="sort-label" 
                        style={{flexGrow: "1"}}
                        onChange={(e) => setSearchParamImmediate({ sortedField: e.target.value })}>
                    <MenuItem value='none'>{ tr('constants.none') }</MenuItem>
                    <MenuItem value='name'>{ tr('constants.name') }</MenuItem>
                    <MenuItem value='description'>{ tr('constants.description') }</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{marginLeft: `10px`, flexGrow: "1"}}>
                <InputLabel id="museums-label">{ tr('constants.museum') }</InputLabel>
            <Select value={ museumId } 
                        labelId={"museums-label"}
                        onChange={(e) => setSearchParamImmediate({ museumId: e.target.value, updateId: 'current' })}
                        style={{flexGrow: "1"}}
                    >
                    {
                        museums.map(m =>
                            <MenuItem key={m.id} value={m.id}>{m.name === 'current' ? tr('constants.current') : m.name }</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <FormControl 
                style={{marginLeft: `10px`, flexGrow: "1"}}
                disabled={museumId === -1}>
                <InputLabel id="update-label">{ tr('pictures.releaseId') }</InputLabel>
            <Select value={ updateId } 
                        labelId={"update-label"}
                        onChange={(e) => setSearchParamImmediate({ updateId: e.target.value })}
                        style={{flexGrow: "1"}}
                    >
                    {
                        [...Array(currentMuseumUpdatesLength).keys()].concat(['current']).map((v, index) => 
                            <MenuItem key={v} value={v}>{v === 'current' ? tr('constants.current') : v}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { searchParams: { sortedField, sortedType, museumId, updateId} } = state.pictures;
    const { museums } = state.museums;
    return {
        sortedField,
        sortedType,
        museumId,
        museums,
        updateId
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        setSearchParam: debounce((param) => dispatch(setSearchParams(param)), 400),
        setSearchParamImmediate: (param) => dispatch(setSearchParams(param))
    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withTranslate
)(PicturesSettingsSearch);