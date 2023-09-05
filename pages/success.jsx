import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from '../components/NoSsr';

import { useStateContext } from '../context/StateContext';

import { runFireworks } from '../lib/utils';

//rafce snippet
const Success = () => {
	//get properties from our state context to reset them to 0
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

	//clear state and localstorage on page load
	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<NoSsr>
						<BsBagCheckFill />
					</NoSsr>
				</p>
				<h2>Thank you for your order!</h2>
				<br />
				<p className='email-msg'>Check your email for the receipt</p>
				<p className='description'>If you have any questions please email us at<a className='email' href="mailto:help@example.com">help@example.com</a></p>
				<Link href="/">
					<button type="button" width="300px" className='btn'>
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Success