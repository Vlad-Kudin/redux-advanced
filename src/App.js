import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch(
      'https://react-course-http-a4f50-default-rtdb.firebaseio.com/cart.json',
      {
        method: 'PUT',
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);

  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
