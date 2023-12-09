import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import StatusBarMessage from './components/UI/StatusBarMessage';
import { getCartData, sendCartData } from './store/cart-slice';

let isInitialRunning = true;

function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const statusMessage = useSelector((state) => state.main.statusMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    if (cart.isCartContentChanged) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);

  return (
    <Fragment>
      {statusMessage && <StatusBarMessage
        status={statusMessage.status}
        title={statusMessage.title}
        message={statusMessage.message}
      />}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
