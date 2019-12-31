import React from 'react';
import { bool, func } from 'prop-types';

import Button from '../Button';
import Icon from '../Icon';
import { Lock as LockIcon } from 'react-feather';

const CheckoutButton = ({ disabled, onClick }) => {
    return (
    	<ul className="shopping__btn">
    	<li><a href="cart.html">View Cart</a></li>
    	<li className="shp__checkout">
    		<Button priority="high" disabled={disabled} onClick={onClick}>
	            Checkout
	        </Button>
    	</li>
    	</ul>
    );
};

CheckoutButton.propTypes = {
    disabled: bool,
    onClick: func
};

export default CheckoutButton;
