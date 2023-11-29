import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        <ProductItem
          title="Супер-Товар"
          price={7}
          description="Благодаря своему высокому качеству, этот товар прослужит вам очень долго."
        />
      </ul>
    </section>
  );
};

export default Products;
