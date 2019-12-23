import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

export const useMenu = props => {
    const {categoryId, query} = props;
    const [runQuery, queryResult] = useLazyQuery(query);
    const { data } = queryResult;
    
    // fetch categories
    useEffect(() => {
        if (categoryId != null) {
            runQuery({ variables: { id: categoryId } });
        }
    }, [categoryId, runQuery]);
    
    return data;
};