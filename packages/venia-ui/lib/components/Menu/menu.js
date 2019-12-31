import React, { Suspense } from 'react';

import { useMenu } from '@magento/peregrine/lib/talons/Menu/useMenu';

import defaultClasses from './menu.css';
import GET_MENU_QUERY from '../../queries/getMenu.graphql';
import SubMenu from './subMenu';

const Menu = props => {
    
    const categories = useMenu({ categoryId:2, query: GET_MENU_QUERY });
    try{
        const subCategories = Array.from(categories.category.children, childCategory => {
            if(childCategory.name != null){
                if(childCategory.children_count > 0){
                    
                    let subCat = childCategory.children.map((category, index) => {

                        if(category.children_count > 0){
                            
                            let sub = category.children.map((category, index) => {
                                return (
                                    <li><SubMenu category={category} /></li>
                                ); 
                            });

                            return (
                                <li>
                                    <SubMenu category = {category} />
                                    <ul className="mega__item">
                                        {sub}
                                    </ul>
                                </li>
                            );

                        }else{
                            return (
                                <li><SubMenu category={category} /></li>
                            ); 
                        }
                        
                    });

                    return (
                            <li className="drop">
                                <SubMenu category = {childCategory} />
                                <ul className="dropdown mega_dropdown">
                                    {subCat}
                                </ul>
                            </li>
                        );

                }else{
                    return (
                        <li className="drop">
                            <SubMenu category = {childCategory} />
                        </li>
                    );
                }
            }
        });

        return (
            <ul className="main__menu">{subCategories}</ul>
        );
    }catch(error){
        return ( <span></span> );
    }
};

export default Menu;