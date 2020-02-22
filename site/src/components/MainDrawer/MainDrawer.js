import React from 'react';
import { connect } from 'react-redux'

import './MainDrawer.scss';
import { changeVisibleDrawer } from '../../actions/drawerActions';
import { Drawer as UIDrawer, List, ListItem, ListItemIcon, ListItemText, Button, makeStyles, Typography, useTheme, CssBaseline, AppBar, Toolbar, Divider, ListItemSecondaryAction, Icon, Select, FormControl, MenuItem } from '@material-ui/core';
import {
    Menu as MenuIcon,
    Delete as DeleteIcon,
    ExitToApp as ExitToAppIcon,
    Favorite as FavotireIcon,
    Museum as MuseumIcon
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { unlogin } from '../../actions/userActions';
import { changeLanguage } from '../../actions/languageActions';
import { languages, tr } from '../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../hocs/withTranslate';

const drawerWidth = 240;
const fillDrawerWindowWidth = 480;

const MainDrawer = (props) => {

    const { language, opened, title } = props;
    const { changeLanguage, changeVisibleDrawer } = props;

    const classes = useStyles();
    const theme = useTheme();

    const items = [
        <ListItem
            key={-1}
            button
            onClick={() => { props.history.push("/profile"); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}>
            <ListItemIcon>
                <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={ tr('profile.title') }/>
            <ListItemSecondaryAction>
                <IconButton onClick={() => { props.unlogin(); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}>
                    <ExitToAppIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>,
        <ListItem
            key={-2}
            button
            onClick={() => { props.history.push("/"); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={ tr('home.title') } />
        </ListItem>,
        <ListItem
            key={-3}
            button
            onClick={() => { props.history.push("/documentation"); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}>
            <ListItemIcon>
                <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary={ tr('documentation.title') }/>
        </ListItem>,
        <ListItem
            key={-4}
            button
            onClick={() => { props.history.push("/pictures"); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}
        >
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary={ tr('pictures.title') } />
        </ListItem>,
        <ListItem
            key={-5}
            button
            onClick={() => { props.history.push("/museums"); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}
        >
            <ListItemIcon><MuseumIcon /></ListItemIcon>
            <ListItemText primary={ tr('museums.title') } />
        </ListItem>,

        <ListItem
            key={-6}
            button
            onClick={() => { props.history.push("/favorites"); if(window.innerWidth < fillDrawerWindowWidth) changeVisibleDrawer(); }}
        >
            <ListItemIcon><FavotireIcon /></ListItemIcon>
            <ListItemText primary={ tr('favorites.title') } />
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
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
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
                        {title}
                    </Typography>
                    <FormControl color="secondary" className={clsx(classes.whiteSelect)}>
                        <Select value={language} onChange={(e) => changeLanguage(e.target.value)}>
                            {
                                Object.keys(languages).map(l => 
                                    <MenuItem key={l} value={l}>{ (() => {
                                        switch(l) {
                                            case 'ua': return "Українська";
                                            case 'en': return 'English';
                                        }
                                    })() }</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: opened,
                })}
            >
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
            </UIDrawer>
        </div>
    );
}

const mapStateToProps = ({ language, drawer: { opened, title } }) => ({
    opened, title, language
});

export default compose(
    connect(mapStateToProps, { changeLanguage, changeVisibleDrawer, unlogin }),
    withTranslate,
    withRouter
)(MainDrawer);

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
        position: 'absolute',
        width: drawerWidth,
        flexShrink: 0,
        ['@media (max-width:480px)']: {
            width: '100%'
        }
    },
    drawerPaper: {
        width: drawerWidth,
        ['@media (max-width:480px)']: {
            width: '100%'
        }
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
        marginTop: `64px`,
        
        ['@media (max-width:480px)']: {
            padding: '2px'
        }
    },
    contentShift: {
        maxWidth: `calc(100% - ${drawerWidth}px)`,
        ['@media (max-width:480px)']: {
            maxWidth: '100%'
        },
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },

    whiteSelect : {
        "& *, & *:before": {
            borderColor: "white",
            color: 'white'
        }
    }
}));