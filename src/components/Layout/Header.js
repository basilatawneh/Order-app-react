import React from "react";


import classes from './Header.module.css';
import mealsImg from './../../assets/meals.jpg'
import HeaderCardButton from "./HeaderCardButton";
const Header = props => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCardButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt='A table full od delicious food!' />
        </div>

    </React.Fragment>
}

export default Header;