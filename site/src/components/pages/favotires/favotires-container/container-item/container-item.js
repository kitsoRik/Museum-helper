import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PictureItem from '../../../../picture-item';
import { deleteFavoriteGroup, moveGroup } from '../../../../../actions/favoritesActions';

import './container-item.scss';
import { ExpansionPanel, 
    ExpansionPanelSummary, 
    ExpansionPanelDetails, 
    TextField, 
    IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EjectIcon from '@material-ui/icons/Eject';

const ContainerItem = (props) => {

    const { editable } = props;
    const { group: { id, name, description, items }} = props;
    const { onGroupNameChanged, deleteGroup, moveGroup } = props;

    const [expanded, setExpanded] = useState(false);

    if(id === -1 && items.length === 0) return null;

    return (
        <div className="container-item">
            <ExpansionPanel 
                expanded={expanded} 
                onChange={() => setExpanded(!expanded)}>
        <ExpansionPanelSummary
            style={{height: "40px"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
        >
            <div className="container-item-header">
            { editable && id !== -1 &&
            <TextField 
                className="container-item-header-name"
                defaultValue={name} 
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => onGroupNameChanged(e.target.value)}
                color="primary"
                /> 
            }
            { editable && id !== -1 &&
                <TextField 
                    className="container-item-header-description"
                    defaultValue={description} 
                    onClick={(e) => e.stopPropagation()}
                    onBlur={(e) => onGroupNameChanged(e.target.value)}/> 
            }
            { (!editable || id === -1) &&
                <span className="container-item-header-name">{ name }</span> 
            }
            { (!editable || id === -1) &&
                <span className="container-item-header-description">{ description }</span>
            }
            { editable &&  id !== -1 &&
                <IconButton>
                    <HighlightOffIcon 
                        color="secondary"
                        onClick={(e) => { e.stopPropagation(); deleteGroup(id); }}/>
                </IconButton>
            }
            { editable &&  id !== -1 &&
                <IconButton onClick={(e) => {e.stopPropagation(); moveGroup(id, 'up')}}>
                    <EjectIcon />
                </IconButton>
            }
            { editable &&  id !== -1 &&
                <IconButton onClick={(e) => { e.stopPropagation(); moveGroup(id, 'down')}}>
                    <EjectIcon style={{transform: "rotate(180deg)"}}/>
                </IconButton>
            }
            </div>
          </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Droppable
                droppableId={id.toString()}
                direction="horizontal">
                {
                (provided, snapshot) => {
                    return (
                        <div 
                            className="container-item-droppable"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {items.map((item, index) => {
                                return (
                                    <Draggable
                                        isDragDisabled={!editable}
                                        key={item.id}
                                        draggableId={item.id.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    
                                                    style={{
                                                        color: "white",
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <PictureItem 
                                                        picture={item.picture}
                                                        editing={editable}/>
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        </div>
    );
}



const mapStateToProps = ({ favorites: { editable }}) => {
    return {
        editable
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        deleteGroup: (id) => dispatch(deleteFavoriteGroup(id)),
        moveGroup: (id, direction) => dispatch(moveGroup(id, direction))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ContainerItem);