import React, { useState } from 'react';
import { connect } from 'react-redux'
import MuseumItem from './MuseumItem/MuseumItem';

import './MuseumItemsContainer.scss';
import NewReleaseDialog from './NewReleaseDialog';
import MuseumItemContextMenu from './MuseumItemContextMenu/MuseumItemContextMenu';

const MuseumItemsContainer = (props) => {

    const { museums } = props;

    const [newReleaseMuseum, setNewReleaseMuseum] = useState(null);
    const [newReleaseDialogVisible, setNewReleaseDialogVisible] = useState(false);

    const [contextMenuMuseum, setContextMenuMuseum] = useState(undefined);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const museumsItems = museums.map(m => {
        return (
            <MuseumItem 
                key={m.id} 
                museum={m} 
                openContextMenu={(x, y) => {  setContextMenuMuseum(m); setContextMenuPosition({ x, y }); setContextMenuVisible(true); }}
                openReleaseDialog={() =>{ setNewReleaseMuseum(m); setNewReleaseDialogVisible(true); }}/>
        )
    });

    return ( 
        <div className="museum-items-container">
            { museumsItems }
            <NewReleaseDialog 
                museum={newReleaseMuseum}
                visible={newReleaseDialogVisible} 
                setVisible={setNewReleaseDialogVisible}/>
            <MuseumItemContextMenu
                    museum={contextMenuMuseum}
                    visible={contextMenuVisible}
                    setVisible={setContextMenuVisible}
                    position={contextMenuPosition}
                />
        </div>
     );
}

const mapStateToProps = ({ museums: { museums }}) => ({
    museums
});

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(MuseumItemsContainer);