import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cartContext';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [highlightBtn, setHighlightBtn] = useState(false);
  const ctx = useContext(CartContext);

  const btnClasses = `${classes.button} ${highlightBtn ? classes.bump : ''}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setHighlightBtn(false);
    }, 300);
    setHighlightBtn(true);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {ctx.items.reduce((curNum, item) => {
          return curNum + item.amount;
        }, 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
