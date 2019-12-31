import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import { mergeClasses } from '../../classify';
import Autocomplete from './autocomplete';
import SearchField from './searchField';
import defaultClasses from './searchBar.css';

const SearchBar = props => {
    const { history, isOpen, location } = props;
    const talonProps = useSearchBar({ history });
    const {
        containerRef,
        expanded,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        setExpanded
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <React.Fragment>
        <div className="search__area">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="search__inner">
                            <Form
                                autoComplete="off"
                                className={classes.form}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                <SearchField
                                    location={location}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                                <div className={classes.autocomplete}>
                                    <Autocomplete
                                        setVisible={setExpanded}
                                        visible={expanded}
                                    />
                                </div>
                            </Form>
                            <div className="search__close__btn">
                                <span className="search__close__btn_icon">
                                <i className="zmdi zmdi-close"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    history: shape({
        push: func.isRequired
    }).isRequired,
    isOpen: bool,
    location: shape({}).isRequired
};
