import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { ChevronDown as ArrowDown, ChevronUp as ArrowUp } from 'react-feather';
import { Form } from 'informed';
import { useFilterBlock } from '@magento/peregrine/lib/talons/FilterModal';
import setValidator from '@magento/peregrine/lib/validators/set';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import FilterList from './FilterList';
import defaultClasses from './filterBlock.css';

const FilterBlock = props => {
    const { filterApi, filterState, group, items, name } = props;
    const talonProps = useFilterBlock({ group });
    const { handleClick, isExpanded, isSwatch } = talonProps;
    const iconSrc = isExpanded ? ArrowUp : ArrowDown;
    const classes = mergeClasses(defaultClasses, props.classes);
    const listClass = isExpanded
        ? classes.list_expanded
        : classes.list_collapsed;

    return (
        <div className="htc__category">
            <h4 className="title__line--4">{name}</h4>
            <Form className={listClass}>
                <FilterList
                    filterApi={filterApi}
                    filterState={filterState}
                    group={group}
                    isSwatch={isSwatch}
                    items={items}
                    name={name}
                />
            </Form>
        </div>
    );
};

export default FilterBlock;

FilterBlock.propTypes = {
    classes: shape({
        header: string,
        list_collapsed: string,
        list_expanded: string,
        name: string,
        root: string,
        trigger: string
    }),
    filterApi: shape({}).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    items: arrayOf(shape({})),
    name: string.isRequired
};
