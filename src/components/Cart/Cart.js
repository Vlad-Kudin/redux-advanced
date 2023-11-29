import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  return (
    <Card className={styles.cart}>
      <h2>Мои Покупки</h2>
      <ul>
        <CartItem
          item={{ title: "Супер-Товар", quantity: 2, total: 14, price: 7 }}
        />
      </ul>
    </Card>
  );
};

export default Cart;
