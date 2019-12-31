import React from 'react';
import { shape, string } from 'prop-types';
import RichContent from '../../components/RichContent';
import { mergeClasses } from '../../classify';
import defaultClasses from './home.css';

import { Link, resourceUrl } from 'src/drivers';

const Home = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
};

Home.propTypes = {
    classes: shape({
        copyright: string,
        root: string,
        tile: string,
        tileBody: string,
        tileTitle: string
    })
};

export default Home;
