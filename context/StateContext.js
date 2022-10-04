import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { TiArrowForwardOutline } from 'react-icons/ti';

const Context = createContext();

export const StateContext = ({ children }) => {
    // useStateSnippet
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    //normal variables
    let foundProduct;
    let index;
    let timeAddedToCart;

    // state functions
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        // update our states
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        // run if item already exists in the cart
        if (checkProductInCart) {
            // update # of items in cart
            const updatedCartItems = cartItems.map((cartProduct) => {
                console.log('item already exists: ', cartProduct);
                // cartProduct._time

                // appends a timestamp to the cartProduct object
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity,
                    timeAddedToCart: timeAddedToCart ? timeAddedToCart : Date.now()
                }
            });

            setCartItems(updatedCartItems);
            // else run this if item doesn't already exist in cart
        } else {
            console.log('item doesnt already exist: ', product);
            product.quantity = quantity;
            if (!product.timeAddedToCart) {
                product.timeAddedToCart = Date.now();
            }

            setCartItems([...cartItems, { ...product }]);
        }
        // success toast message
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.price * foundProduct.quantity));
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    //cart functions
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        // do not use "splice", this mutates the state (big no no in react), use filter instead
        // keep all of the items except the one we are changing (i.e filtering out)
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            let sortedCartItemsInc = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }];
            // console.log("before sort inc: ", sortedCartItemsInc);
            sortedCartItemsInc.sort((a, b) => (a.timeAddedToCart - b.timeAddedToCart));
            // console.log("after sort inc: ", sortedCartItemsInc);

            setCartItems(sortedCartItemsInc);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                let sortedCartItemsDec = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }];
                // console.log("before sort dec: ", sortedCartItemsDec);
                sortedCartItemsDec.sort((a, b) => (a.timeAddedToCart - b.timeAddedToCart));
                // console.log("after sort dec: ", sortedCartItemsDec);

                setCartItems(sortedCartItemsDec);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }




    //increment functions
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
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
                incQty,
                decQty,
                onAdd,
                onRemove,
                setShowCart,
                toggleCartItemQuantity,
            }}
        >
            {children}
        </Context.Provider>
    )
}

// export global state and functions also allows us to use our state like a hook
export const useStateContext = () => useContext(Context);