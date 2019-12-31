import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';

import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';

import { mergeClasses } from '../../classify';
import { Title } from '../../components/Head';
import Breadcrumbs from '../../components/Breadcrumbs';
import Gallery from '../../components/Gallery';
import Pagination from '../../components/Pagination';
import defaultClasses from './category.css';

const FilterModal = React.lazy(() => import('../../components/FilterModal'));

const CategoryContent = props => {
    const { data, pageControl } = props;

    const talonProps = useCategoryContent({ data });

    const {
        categoryId,
        categoryName,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters} /> : null;

    return (
        <Fragment>
            <Title>{pageTitle}</Title>
            <section className="htc__product__grid bg__white ptb--30">
                <div className="container">
                    <div className="row">
                        {/*<Breadcrumbs categoryId={categoryId} />
                        <h1 className={classes.title}>
                            <div className={classes.categoryTitle}>{categoryName}</div>
                        </h1>*/}
                        <div className="col-lg-9 col-lg-push-3 col-md-9 col-md-push-3 col-sm-12 col-xs-12">
                            <div className="htc__product__rightidebar">
                                <div className="htc__grid__top">
                                    <div className="htc__select__option">
                                        <select className="ht__select">
                                            <option>Default softing</option>
                                            <option>Sort by popularity</option>
                                            <option>Sort by average rating</option>
                                            <option>Sort by newness</option>
                                        </select>
                                        <select className="ht__select">
                                            <option>Show by</option>
                                            <option>Sort by popularity</option>
                                            <option>Sort by average rating</option>
                                            <option>Sort by newness</option>
                                        </select>
                                    </div>
                                    <div className="ht__pro__qun">
                                        <span>Showing 1-12 of 1033 products</span>
                                    </div>
                                    <ul className="view__mode" role="tablist">
                                        <li role="presentation" className="grid-view active"><a href="#grid-view" role="tab" data-toggle="tab"><i className="zmdi zmdi-grid"></i></a></li>
                                        <li role="presentation" className="list-view"><a href="#list-view" role="tab" data-toggle="tab"><i className="zmdi zmdi-view-list"></i></a></li>
                                    </ul>
                                </div>
                                <Gallery items={items} />
                            </div>
                            <Pagination pageControl={pageControl} />
                        </div>
                        <Suspense fallback={null}>{modal}</Suspense>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        gallery: string,
        headerButtons: string,
        pagination: string,
        root: string,
        title: string
    })
};
