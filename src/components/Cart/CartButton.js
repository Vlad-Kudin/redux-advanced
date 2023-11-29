import { mainActions } from "../../store/main-slice";
import { useDispatch } from "react-redux";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartVisibilityHandler = () => {
    dispatch(mainActions.toggleCartVisibility());
  }

  return (
    <button className={styles.button} onClick={cartVisibilityHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>2</span>
    </button>
  );
};

export default CartButton;
