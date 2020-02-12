import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeDrawerTitle } from '../../../actions/drawerActions';
import DocumentationContainer from './documentation-container/documentation-container';

const Documentation = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeDrawerTitle("Documentation"));
    }, [ ])

    return ( 
        <div>
            <DocumentationContainer />
        </div>
     );
}

export default Documentation;