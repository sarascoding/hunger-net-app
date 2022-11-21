export const roleBasedRoutes = {
  admin: [
    {
      to: '/user-list',
      title: 'User List'
    },

    {
      to: '/restaurant-list',
      title: 'Restaurant List'
    }
  ],
  manager: [
    {
      to: '/menu-list',
      title: 'Menu List'
    },
    {
      to: '/order-list',
      title: 'Order List'
    }
  ],
  client: [
    {
      to: '/my-orders',
      title: 'My Orders'
    },
    {
      to: '/restaurant-list-client',
      title: 'Restaurant List'
    }
  ]
};
