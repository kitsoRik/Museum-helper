import React, { useState } from 'react';
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';


import './favorites-container.scss';
import ContainerItem from './container-item/container-item';
import { changeFavoritesGroups, changeEditable } from '../../../../actions/favoritesActions';
import { FormControlLabel, Switch } from '@material-ui/core';
import EditButton from './edit-button/edit-button';

const onDragEnd = (result, groups, setGroups) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceGroupIndex = groups.findIndex(g => g.id == source.droppableId);
    //                                              int == string
    const destinationGroupIndex = groups.findIndex(g => g.id == destination.droppableId);
    //                                              int == string
    
    if(sourceGroupIndex === destinationGroupIndex) {
        const sourceItem = groups[sourceGroupIndex].items[source.index];
        const destinationItem = groups[destinationGroupIndex].items[destination.index];
    
        const newGroups = groups.filter(() => true);
    
        newGroups[sourceGroupIndex].items[source.index] = destinationItem;
        newGroups[destinationGroupIndex].items[destination.index] = sourceItem;
        setGroups(newGroups);
    } else {
        const sourceItem = groups[sourceGroupIndex].items[source.index];
        const destinationItem = groups[destinationGroupIndex].items[destination.index];
    
        const newGroups = groups.map(g => {
            return {
                ...g,
                items: g.items.filter(() => true)
            }
        });
        newGroups[sourceGroupIndex].items = newGroups[sourceGroupIndex].items.filter(i => i.id !== sourceItem.id);
        
        let newItems = newGroups[destinationGroupIndex]
                            .items.filter(() => true);
        newItems.splice(destination.index, 0, sourceItem);
        newGroups[destinationGroupIndex].items = newItems;
        setGroups(newGroups);
    }
  };

const FavotiresContainer = (props) => {
    const { editable, groups, setGroups } = props;
    const { setEditable } = props; 
    const containerItems = groups.map((group, index) => {
        const onGroupNameChanged = (name) => {
            let newGroups = groups.filter(() => true);
            newGroups[index].name = name;
            setGroups(newGroups);
        }
        return <ContainerItem 
            key={group.id.toString()} 
            group={group}
            onGroupNameChanged={onGroupNameChanged} />
    });

    const switchEditable = (value) => {
        if(value) {
            setEditable(true);
        } else {
            setEditable(false, groups);
        }
    }

    return (
        <div className="favorites-container">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, groups, setGroups)}>
                <div className="favorites-items-container">
                    { containerItems }
                </div>
            </DragDropContext>
            <EditButton 
                editable={editable}
                switchEditable={switchEditable}/>
        </div>
    );
}

const mapStateToProps = ({ favorites: { editable, groups }}) => {
    return {
        editable,
        groups
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        setEditable: (editable, groups) => dispatch(changeEditable(editable, groups)),
        setGroups: (groups) => dispatch(changeFavoritesGroups(groups))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(FavotiresContainer);