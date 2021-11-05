import { useContext, useEffect, useState } from 'react'

import CartIcon from './Cart/CartIcon.js'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context.js'



const HeaderCartButton = (props) => {
    const [btnIsHighighted, setBtnIsHighighted] = useState(false);

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);


    const btnClasses = `${classes.button} ${btnIsHighighted ? classes.bump : ''}`


    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighighted(false)
        }, 150)

        return () => {
            clearTimeout(timer);
        }

    }, [items])



    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span >Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton