import React, { useMemo } from 'react';
import { func, number, shape, string } from 'prop-types';
import { usePagination } from '@magento/peregrine/lib/talons/Pagination/usePagination';

import { mergeClasses } from '../../classify';
import defaultClasses from './pagination.css';
import Tile from './tile';
import NavButton from './navButton';
import { navButtons } from './constants';

const Pagination = props => {
    const { currentPage, setPage, totalPages } = props.pageControl;

    const talonProps = usePagination({
        currentPage,
        setPage,
        totalPages
    });

    const {
        handleLeftSkip,
        handleRightSkip,
        handleNavBack,
        handleNavForward,
        isActiveLeft,
        isActiveRight,
        tiles
    } = talonProps;

    const navigationTiles = useMemo(
        () =>
            tiles.map(tileNumber => {
                return (
                    <li><Tile
                        isActive={tileNumber === currentPage}
                        key={tileNumber}
                        number={tileNumber}
                        onClick={setPage}
                    /></li>
                );
            }),
        [currentPage, tiles, setPage]
    );

    if (totalPages === 1) {
        return null;
    }

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className="row">
            <div className="col-xs-12">
                <ul className="htc__pagenation">
                    {/*<li><NavButton
                        name={navButtons.firstPage.name}
                        active={isActiveLeft}
                        onClick={handleLeftSkip}
                        buttonLabel={navButtons.firstPage.buttonLabel}
                    /></li>*/}
                    <li><NavButton
                        name={navButtons.prevPage.name}
                        active={isActiveLeft}
                        onClick={handleNavBack}
                        buttonLabel={navButtons.prevPage.buttonLabel}
                    /></li>
                    {navigationTiles}
                    <li><NavButton
                        name={navButtons.nextPage.name}
                        active={isActiveRight}
                        onClick={handleNavForward}
                        buttonLabel={navButtons.nextPage.buttonLabel}
                    /></li>
                    {/*<li><NavButton
                        name={navButtons.lastPage.name}
                        active={isActiveRight}
                        onClick={handleRightSkip}
                        buttonLabel={navButtons.lastPage.buttonLabel}
                    /></li>*/}
                </ul>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    classes: shape({
        root: string
    }),
    pageControl: shape({
        currentPage: number,
        setPage: func,
        totalPages: number
    }).isRequired
};

export default Pagination;
