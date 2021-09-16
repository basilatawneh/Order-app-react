import {useContext, useEffect, useState} from 'react'
import CartIcon from './../Cart/CartIcon';
import CartContext from './../../store/cart-context'
import classes from './HeaderCardButton.module.css';
const HeaderCardButton = props => {
    const [btnHighlight, setBtnHighlight] = useState(false);
    
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((cur, next) => cur + next.amount , 0);
const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`
useEffect(() => {
    if(cartCtx.items.length === 0) {
        return ;
    }
    setBtnHighlight(true);
    const timer = setTimeout(() => setBtnHighlight(false), 300);
    return () => {
        clearTimeout(timer);
    }
}, [cartCtx.items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCardButton;