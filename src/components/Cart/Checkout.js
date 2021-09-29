import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const [isValid, setIsValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  });
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const isShorter = (value, len = 0) => value.trim().length < len;
  const isEmpty = (value) => !value || isShorter(value);
  const checkTheFormValidity = () => {
    const [nameValue, streetValue, postalValue, cityValue] = [nameRef.current.value, streetRef.current.value, postalRef.current.value, cityRef.current.value];

    setIsValid({
      name: !isEmpty(nameValue) && !isShorter(nameValue, 3),
      street: !isEmpty(streetValue),
      postal: !isEmpty(postalValue) && !isShorter(postalValue, 5),
      city: !isEmpty(cityValue)
    });

    return isValid.name && isValid.street && isValid.postal && isValid.city;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    setIsFirstSubmit(false);
    if (!checkTheFormValidity()) {
      return;
    }

    const [nameValue, streetValue, postalValue, cityValue] = [nameRef.current.value, streetRef.current.value, postalRef.current.value, cityRef.current.value];

    props.onSubmit({ nameValue, streetValue, postalValue, cityValue });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <div className={`${classes.control} ${!isFirstSubmit && !isValid.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} onChange={checkTheFormValidity} />
        {!isFirstSubmit && !isValid.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${!isFirstSubmit && !isValid.street ? classes.invalid : ''}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} onChange={checkTheFormValidity} />
        {!isFirstSubmit && !isValid.street && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${!isFirstSubmit && !isValid.postal ? classes.invalid : ''}`}>
        <label htmlFor='postal'>postal code</label>
        <input type='text' id='postal' ref={postalRef} onChange={checkTheFormValidity} />
        {!isFirstSubmit && !isValid.postal && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${!isFirstSubmit && !isValid.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} onChange={checkTheFormValidity} />
        {!isFirstSubmit && !isValid.city && <p>Please enter a valid name</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}
export default Checkout;