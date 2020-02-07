import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PictureItem from '../../../../picture-item';

import './container-item.scss';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';

const ContainerItem = (props) => {

    const { editable } = props;
    const { group: { id, name, items }} = props;

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
        { editable && 
          <TextField defaultValue={name} onClick={(e) => e.stopPropagation()}/> 
          }
          { !editable && 
            <span style={{fontSize: "14px"}}>{ name }</span> }
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
                                                        scaling={false}/>
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

    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ContainerItem);