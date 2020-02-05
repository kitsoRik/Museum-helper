import React, { useEffect } from 'react';
import withDrawer from '../../withDrawer';
import { useDispatch } from 'react-redux';
import { changeDrawerTitleCreator } from '../../../actions/drawerActions';

const Documentation = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeDrawerTitleCreator("Documentation"));
    }, [ ])

    return ( 
        <div>
            Documentation
        </div>
     );
}

export default withDrawer(Documentation);