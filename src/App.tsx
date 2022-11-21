import { Route, Routes } from 'react-router-dom';
import Login from './views/common/Login';
import UserList from './views/admin/UserList';
import RestaurantList from './views/common/RestaurantList';
import { Amplify } from 'aws-amplify';
import ViewUser from './views/admin/ViewUser';
import awsconfig from './aws-exports';
import MenuList from './views/manager/MenuList';
import OrderList from './views/manager/OrderList';
import ViewMenu from './views/manager/ViewMenu';
import ViewOrder from './views/manager/ViewOrder';
import MyOrders from './views/client/MyOrders';
Amplify.configure(awsconfig);
/**
 * Top level application router
 *
 * @returns {Component}
 */
function App() {
  const NotFoundComponent = () => <div>404 NOT FOUND</div>;

  return (
    <Routes>
      <Route path='/' element={<UserList />} />
      <Route path='/login' element={<Login />} />
      {/* Private Route */}
      <Route path='/user-list' element={<UserList />} />
      <Route path='/user-list/:id' element={<ViewUser />} />

      <Route path='/restaurant-list' element={<RestaurantList />} />

      <Route path='/menu-list' element={<MenuList />} />
      <Route path='/menu-list/:id' element={<ViewMenu />} />

      <Route path='/order-list' element={<OrderList />} />
      <Route path='/order-list/:id' element={<ViewOrder />} />

      <Route path='/restaurant-list-client' element={<RestaurantList viewOnly />} />

      <Route path='/my-orders' element={<MyOrders />} />

      <Route path='*' element={<NotFoundComponent />} />
    </Routes>
  );
}
export default App;
