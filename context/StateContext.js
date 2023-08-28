import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { TiArrowForwardOutline } from 'react-icons/ti';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from '../components/NoSsr';

const Context = createContext();

export const StateContext = ({ children }) => {
	// useStateSnippet
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);
	const [localQuantities, setLocalQuantities] = useState({});

	useEffect(() => {
		if (showCart) {
			document.body.classList.add('body-with-cart-open');

			// Accessing the slick-prev and arrow-left elements and modifying their styles:
			const elementsToHide = document.querySelectorAll('.slick-prev, .arrow-left');
			elementsToHide.forEach(el => {
				el.style.zIndex = '-1';  // Hide them when cart is shown
			});
		} else {
			document.body.classList.remove('body-with-cart-open');

			// Restore z-index for slick-prev and arrow-left when cart is not shown:
			const elementsToShow = document.querySelectorAll('.slick-prev, .arrow-left');
			elementsToShow.forEach(el => {
				el.style.zIndex = '1';  // Set to a value that makes them visible
			});
		}

		// Cleanup function:
		return () => {
			document.body.classList.remove('body-with-cart-open');

			// Restore z-index for slick-prev and arrow-left when component unmounts:
			const elementsToShow = document.querySelectorAll('.slick-prev, .arrow-left');
			elementsToShow.forEach(el => {
				el.style.zIndex = '1';  // Set to a value that makes them visible
			});
		};
	}, [showCart]);

	useEffect(() => {
		// Function to handle the back button press
		const handleBackButton = (event) => {
			if (showCart) {
				// Prevent the browser's default back action
				event.preventDefault();

				// Close the cart
				setShowCart(false);
			}
		};

		// If the cart is shown, push a new state to the history
		if (showCart) {
			window.history.pushState({ noBackExitsApp: true }, '');
		}

		// Listen for the popstate event
		window.addEventListener('popstate', handleBackButton);

		// Cleanup: Remove the event listener when the component is unmounted
		return () => {
			window.removeEventListener('popstate', handleBackButton);
		};
	}, [showCart, setShowCart]);



	// state functions

	const getCartItemsFromSession = () => {
		const storedCart = sessionStorage.getItem('cartItems');
		if (storedCart) {
			return JSON.parse(storedCart);
		}
		return [];
	};

	const setCartItemsToSession = (items) => {
		sessionStorage.setItem('cartItems', JSON.stringify(items));
	};

	useEffect(() => {
		const initialCart = getCartItemsFromSession();
		setCartItems(initialCart);
	}, []);



	const onAdd = (product, quantity) => {
		if (!product || !product._id) {
			console.error("Invalid product at start of onAdd:", product);
			return;
		}

		// Get cart items from sessionStorage
		let cartItems = getCartItemsFromSession();

		// Parse and clean up quantity
		let cleanedQuantity = parseInt(quantity, 10);
		if (isNaN(cleanedQuantity) || cleanedQuantity <= 0) cleanedQuantity = 1;

		const checkProductInCart = cartItems.find((item) => item._id === product._id);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id) {
					return {
						...cartProduct,
						quantity: cartProduct.quantity + cleanedQuantity,
						timeAddedToCart: cartProduct.timeAddedToCart ? cartProduct.timeAddedToCart : Date.now()
					}
				}
				return cartProduct;
			});

			// Update cart in state and sessionStorage
			setCartItems(updatedCartItems);
			setCartItemsToSession(updatedCartItems);
		} else {
			product.quantity = cleanedQuantity;
			if (!product.timeAddedToCart) {
				product.timeAddedToCart = Date.now();
			}

			const newCartItems = [...cartItems, { ...product }];

			// Update cart in state and sessionStorage
			setCartItems(newCartItems);
			setCartItemsToSession(newCartItems);
		}

		// update total values - Note: you might consider moving this logic to a useEffect that watches cartItems
		updateTotalPrice();
		updateTotalQuantities();
		setLocalQuantities(cleanedQuantity);

		// success toast message
		toast.success(`${cleanedQuantity} ${product.name} added to the cart.`);
	};

	const onRemove = (product) => {
		// Get cart items from sessionStorage
		let cartItems = getCartItemsFromSession();

		const newCartItems = cartItems.filter((item) => item._id !== product._id);

		// Update cart in state and sessionStorage
		setCartItems(newCartItems);
		setCartItemsToSession(newCartItems);

		// update total values - Note: you might consider moving this logic to a useEffect that watches cartItems
		updateTotalPrice();
		updateTotalQuantities();

		// success toast message
		toast.error(`${product.name} removed from the cart.`);
	};


	const handleQuantityChange = (newQuantity, product) => {
		if (!product || !product._id) {
			console.error("Invalid or missing product:", product);
			return;
		}

		const quantity = parseInt(newQuantity, 10);
		if (isNaN(quantity) || quantity <= 0) return;

		const updatedCartItems = cartItems.map((cartProduct) => {
			if (cartProduct._id === product._id) {
				toast.success(`${cartProduct.name} updated to ${quantity}.`);
				return {
					...cartProduct,
					quantity: quantity
				};
			}

			return cartProduct;
		});

		setCartItems(updatedCartItems);
		sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));

		updateTotalPrice();
		updateTotalQuantities();
	};


	const updateTotalPrice = () => {
		const newTotalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
		setTotalPrice(newTotalPrice);
	};

	const updateTotalQuantities = () => {
		const newTotalQuantities = cartItems.reduce((acc, item) => acc + item.quantity, 0);
		setTotalQuantities(newTotalQuantities);
	};


	useEffect(() => {
		updateTotalPrice();
		updateTotalQuantities();
	}, [cartItems]);

	//increment functions
	const incQty = () => {
		setQty((prevQty) => {
			// If prevQty is not defined or not a number, default it to 1
			if (!prevQty || typeof prevQty !== 'number') {
				return 1;
			}

			return prevQty + 1;
		});
	}
	const decQty = () => {
		setQty((prevQty) => {
			// If prevQty is not defined or not a number, default it to 1
			if (!prevQty || typeof prevQty !== 'number') {
				return 1;
			}

			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	}

	// return global state and functions
	return (
		// not rendering anything, simply wraping everything in the context provider
		<Context.Provider
			// object of values to pass across the entire application
			value={{
				// allows us to access these values from any component in our app after we wrap our <Layout /> and <Component /> (_app.js) with the StateContext
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				setQty,
				incQty,
				decQty,
				onAdd,
				onRemove,
				setShowCart,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
				handleQuantityChange,
				localQuantities,
				setLocalQuantities,
			}}
		>
			{children}
		</Context.Provider>
	)
}

// export global state and functions also allows us to use our state like a hook
export const useStateContext = () => useContext(Context);