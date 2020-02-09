import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const MainHeader = (props) => {
    return ( 
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    //onClick={() => changeVisibleDrawer()}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    "TITLE"
          </Typography>
            </Toolbar>
        </AppBar>
     );
}

export default MainHeader;