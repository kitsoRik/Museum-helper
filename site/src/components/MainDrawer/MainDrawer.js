import React from 'react';
import { connect } from 'react-redux'

import './MainDrawer.scss';
import { changeVisibleDrawer } from '../../actions/drawerActions';
import { Drawer as UIDrawer, List, ListItem, ListItemIcon, ListItemText, Button, makeStyles, Typography, useTheme, CssBaseline, AppBar, Toolbar, Divider, ListItemSecondaryAction, Icon } from '@material-ui/core';
import { Menu as MenuIcon, 
        Delete as DeleteIcon, 
        ExitToApp as ExitToAppIcon,
        Favorite as FavotireIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { unlogin} from '../../actions/userActions';

const drawerWidth = 240;

const MainDrawer = (props) => {

    const { opened, title } = props;
    const { changeVisibleDrawer } = props;

    const classes = useStyles();
    const theme = useTheme();

    const items = [
        <ListItem
            key={-1}
            button
            onClick={() => alert("GO TO PROFILE")}>
            <ListItemIcon>
                <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            <ListItemSecondaryAction>
                <IconButton onClick={() => props.unlogin()}>
                    <ExitToAppIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>,
        <ListItem
            key={-2}
            button
            onClick={() => props.history.push("/")}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>,
        <ListItem
            key={-3}
            button
            onClick={() => props.history.push("/documentation")}>
            <ListItemIcon>
                <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Documentation" />
        </ListItem>,
        <ListItem 
        key={-4}
        button
        onClick={() => props.history.push("/pictures")}    
        >
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary={"Pictures"} />
        </ListItem>,
        
        <ListItem 
        key={-5}
        button
        onClick={() => props.history.push("/favorites")}    
        >
            <ListItemIcon><FavotireIcon /></ListItemIcon>
            <ListItemText primary={"Favorites"} />
        </ListItem>
    ];

return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: opened,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => changeVisibleDrawer()}
                    edge="start"
                    className={clsx(classes.menuButton, opened && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    { title }
          </Typography>
            </Toolbar>
        </AppBar>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: opened,
            })}
        >
            <div className={classes.drawerHeader} />
            {props.children}
        </main>
        <UIDrawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={opened}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => changeVisibleDrawer()}>
                    {theme.direction !== 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {items}
            </List>
            <Divider />
            <List>
                {items}
            </List>
        </UIDrawer>
    </div>
);
}

const mapStateToProps = (state) => {
    const { opened, title } = state.drawer;
    return {
        opened,
        title
    }
}

export default connect(mapStateToProps, { changeVisibleDrawer, unlogin })(withRouter(MainDrawer));

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: "1",
        overflow: "hidden"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        maxWidth: `100%`,
        maxHeight: `calc(100% - 64px)`,
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        maxWidth: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
}));