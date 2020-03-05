import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
    return ( 
        <div>
            404! Go to <Link to="/">CLICK</Link>
        </div>
     );
}

export default NotFound;