import React from 'react'

import ViewItem from './ViewItem/ViewItem';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';

const viewItems = (props) => {
    return (
        <Auxiliar>
            <ViewItem type="view-2" />
            <ViewItem type="view-4" />
            <ViewItem type="view-6" />
        </Auxiliar>
    );
};

export default viewItems;