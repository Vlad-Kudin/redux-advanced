import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { mainActions } from './store/main-slice';
import StatusBarMessage from './components/UI/StatusBarMessage';

let isInitialRunning = true;

function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const statusMessage = useSelector((state) => state.main.statusMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(mainActions.showStatusMessage({
          status: 'pending',
          title: 'Sending',
          message: 'Cart data sending...'
        })
      );
      const response = await fetch(
        'https://react-course-http-a4f50-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart error!')
      }

      dispatch(mainActions.showStatusMessage({
          status: 'succuss',
          title: 'Completed',
          message: 'Cart data sended succussful!'
        })
      );
    };

    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    sendCartData().catch((e) => {
      dispatch(mainActions.showStatusMessage({
          status: 'error',
          title: 'Error',
          message: 'Cart data sending error!'
        })
      );
    })
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
