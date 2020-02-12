import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const DocumentationContainer = (props) => {
    return ( 
        <div>
            <Typography 
                variant="h1"
                align="center"
            >Documentation</Typography>
            <Typography 
                variant="h4"
            >Start</Typography>
            <Typography 
                variant="body1"
            >To start working with this service you must register</Typography>
            <Typography 
                variant="h4"
            >Add picture</Typography>
            <Typography 
                variant="body1"
            >For add picture you need click '+' button in <Link to="/pictures">pictures page</Link></Typography>
        </div>
     );
}

export default DocumentationContainer;