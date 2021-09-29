import { useContext, useState } from 'react';
import Modal from './../UI/Modal';
import cartContext from './../../store/cart-context';
import CartItem from './CartItem'

import classes from './Cart.module.css';
import Checkout from './Checkout';
const Cart = props => {
    const cartCtx = useContext(cartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length !== 0;
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const submitHandler = async (userInfo) => {
        setLoading(true);
        await fetch('https://orders-ada3e-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userInfo,
                orderItems: cartCtx.items
            })
        });
        setLoading(false);
        setFinished(true);
        cartCtx.clearItems();
    }
    const CartItemRomoveHandler = id => {
        cartCtx.removeItem(id)
    };
    const CartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    };
    const orderHandler = () => {
        setIsChecked(true)
    }
    const cartItems = (
        <ul>{
            cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={CartItemRomoveHandler.bind(null, item.id)}
                    onAdd={CartItemAddHandler.bind(null, item)}
                />
            ))
        }
        </ul>)
    const ModelAction = () => (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
        </div>
    );
    return (
        <Modal onClose={props.onClose}>
            {!loading && !finished && <div>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                {isChecked && <Checkout onSubmit={submitHandler} onCancel={props.onClose} />}
                {!isChecked && ModelAction()}
            </div>}
            {loading && !finished && <p>Order data is sending ...</p>}
            {!loading && finished && <>
                <p>Order data sended successfully :)  </p>
                <div className={classes.actions}>
                    <button className={classes.button} onClick={props.onClose}>Close</button>
                </div>
            </>}
        </Modal>
    )
};

export default Cart;