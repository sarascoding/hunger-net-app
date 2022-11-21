/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  createdAt: string,
  email: string,
  restaurantId?: string | null,
  userRole: UserRole,
};

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
}


export type User = {
  __typename: "User",
  id: string,
  restaurantId: string,
  userRole: UserRole,
  email: string,
  createdAt: string,
  orders: OrderConnection,
};

export type OrderConnection = {
  __typename: "OrderConnection",
  cursor?: string | null,
  orders?:  Array<Order | null > | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  userId: string,
  restaurantId: string,
  details: string,
  orderStatus: OrderStatus,
  orderDateTime: string,
};

export enum OrderStatus {
  CREATED = "CREATED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PREPARED = "PREPARED",
  WAITING_FOR_DELIVERY = "WAITING_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
}


export type CreateRestaurantInput = {
  name: string,
};

export type Restaurant = {
  __typename: "Restaurant",
  id: string,
  name: string,
  menus: MenuConnection,
  orders: OrderConnection,
};

export type MenuConnection = {
  __typename: "MenuConnection",
  cursor?: string | null,
  menus?:  Array<Menu | null > | null,
};

export type Menu = {
  __typename: "Menu",
  id: string,
  restaurantId: string,
  title: string,
  publishDate: string,
  menuStatus: MenuStatus,
  menuItems: MenuItemConnection,
};

export enum MenuStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export type MenuItemConnection = {
  __typename: "MenuItemConnection",
  cursor?: string | null,
  menuItems?:  Array<MenuItem | null > | null,
};

export type MenuItem = {
  __typename: "MenuItem",
  id: string,
  menuId: string,
  title: string,
  content: string,
};

export type CreateMenuInput = {
  restaurantId: string,
  publishDate: string,
  menuStatus: MenuStatus,
  title: string,
};

export type CreateMenuItemInput = {
  menuId: string,
  title: string,
  content: string,
};

export type CreateOrderInput = {
  restaurantId: string,
  userId: string,
  details: string,
  orderStatus: OrderStatus,
  orderDateTime: string,
};

export type UpdateUserInput = {
  createdAt?: string | null,
  email?: string | null,
  id: string,
  restaurantId?: string | null,
  userRole?: UserRole | null,
};

export type UpdateRestaurantInput = {
  name: string,
};

export type UpdateMenuInput = {
  id: string,
  restaurantId?: string | null,
  publishDate?: string | null,
  menuStatus?: MenuStatus | null,
  title?: string | null,
};

export type UpdateMenuItemInput = {
  id: string,
  menuId: string,
  title: string,
  content: string,
};

export type UpdateOrderInput = {
  id: string,
  restaurantId?: string | null,
  userId?: string | null,
  details?: string | null,
  orderStatus?: OrderStatus | null,
  orderDateTime?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type DeleteRestaurantInput = {
  id: string,
};

export type DeleteMenuInput = {
  id: string,
  restaurantId: string,
};

export type DeleteMenuItemInput = {
  id: string,
  menuId: string,
};

export type DeleteOrderInput = {
  id: string,
};

export type UserConnection = {
  __typename: "UserConnection",
  users?:  Array<User | null > | null,
  cursor?: string | null,
};

export type RestaurantConnection = {
  __typename: "RestaurantConnection",
  cursor?: string | null,
  restaurants?:  Array<Restaurant | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    restaurantId: string,
    userRole: UserRole,
    email: string,
    createdAt: string,
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type CreateRestaurantMutationVariables = {
  input?: CreateRestaurantInput | null,
};

export type CreateRestaurantMutation = {
  createRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    menus:  {
      __typename: "MenuConnection",
      cursor?: string | null,
    },
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type CreateMenuMutationVariables = {
  input?: CreateMenuInput | null,
};

export type CreateMenuMutation = {
  createMenu?:  {
    __typename: "Menu",
    id: string,
    restaurantId: string,
    title: string,
    publishDate: string,
    menuStatus: MenuStatus,
    menuItems:  {
      __typename: "MenuItemConnection",
      cursor?: string | null,
    },
  } | null,
};

export type CreateMenuItemMutationVariables = {
  input?: CreateMenuItemInput | null,
};

export type CreateMenuItemMutation = {
  createMenuItem?:  {
    __typename: "MenuItem",
    id: string,
    menuId: string,
    title: string,
    content: string,
  } | null,
};

export type CreateOrderMutationVariables = {
  input?: CreateOrderInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    userId: string,
    restaurantId: string,
    details: string,
    orderStatus: OrderStatus,
    orderDateTime: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    restaurantId: string,
    userRole: UserRole,
    email: string,
    createdAt: string,
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type UpdateRestaurantMutationVariables = {
  input?: UpdateRestaurantInput | null,
};

export type UpdateRestaurantMutation = {
  updateRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    menus:  {
      __typename: "MenuConnection",
      cursor?: string | null,
    },
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type UpdateMenuMutationVariables = {
  input?: UpdateMenuInput | null,
};

export type UpdateMenuMutation = {
  updateMenu?:  {
    __typename: "Menu",
    id: string,
    restaurantId: string,
    title: string,
    publishDate: string,
    menuStatus: MenuStatus,
    menuItems:  {
      __typename: "MenuItemConnection",
      cursor?: string | null,
    },
  } | null,
};

export type UpdateMenuItemMutationVariables = {
  input?: UpdateMenuItemInput | null,
};

export type UpdateMenuItemMutation = {
  updateMenuItem?:  {
    __typename: "MenuItem",
    id: string,
    menuId: string,
    title: string,
    content: string,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input?: UpdateOrderInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    userId: string,
    restaurantId: string,
    details: string,
    orderStatus: OrderStatus,
    orderDateTime: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    restaurantId: string,
    userRole: UserRole,
    email: string,
    createdAt: string,
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type DeleteRestaurantMutationVariables = {
  input?: DeleteRestaurantInput | null,
};

export type DeleteRestaurantMutation = {
  deleteRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    menus:  {
      __typename: "MenuConnection",
      cursor?: string | null,
    },
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type DeleteMenuMutationVariables = {
  input?: DeleteMenuInput | null,
};

export type DeleteMenuMutation = {
  deleteMenu?:  {
    __typename: "Menu",
    id: string,
    restaurantId: string,
    title: string,
    publishDate: string,
    menuStatus: MenuStatus,
    menuItems:  {
      __typename: "MenuItemConnection",
      cursor?: string | null,
    },
  } | null,
};

export type DeleteMenuItemMutationVariables = {
  input?: DeleteMenuItemInput | null,
};

export type DeleteMenuItemMutation = {
  deleteMenuItem?:  {
    __typename: "MenuItem",
    id: string,
    menuId: string,
    title: string,
    content: string,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input?: DeleteOrderInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    userId: string,
    restaurantId: string,
    details: string,
    orderStatus: OrderStatus,
    orderDateTime: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    restaurantId: string,
    userRole: UserRole,
    email: string,
    createdAt: string,
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type GetRestaurantQueryVariables = {
  id: string,
};

export type GetRestaurantQuery = {
  getRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    menus:  {
      __typename: "MenuConnection",
      cursor?: string | null,
    },
    orders:  {
      __typename: "OrderConnection",
      cursor?: string | null,
    },
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    userId: string,
    restaurantId: string,
    details: string,
    orderStatus: OrderStatus,
    orderDateTime: string,
  } | null,
};

export type GetMenuPerRestaurantQueryVariables = {
  restaurantId: string,
  id: string,
};

export type GetMenuPerRestaurantQuery = {
  getMenuPerRestaurant?:  {
    __typename: "Menu",
    id: string,
    restaurantId: string,
    title: string,
    publishDate: string,
    menuStatus: MenuStatus,
    menuItems:  {
      __typename: "MenuItemConnection",
      cursor?: string | null,
    },
  } | null,
};

export type ListMenuItemsQueryVariables = {
  num?: number | null,
  after?: string | null,
};

export type ListMenuItemsQuery = {
  listMenuItems?:  {
    __typename: "MenuItemConnection",
    cursor?: string | null,
    menuItems?:  Array< {
      __typename: "MenuItem",
      id: string,
      menuId: string,
      title: string,
      content: string,
    } | null > | null,
  } | null,
};

export type ListUsersQueryVariables = {
  num?: number | null,
  after?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "UserConnection",
    users?:  Array< {
      __typename: "User",
      id: string,
      restaurantId: string,
      userRole: UserRole,
      email: string,
      createdAt: string,
    } | null > | null,
    cursor?: string | null,
  } | null,
};

export type ListUsersByRoleQueryVariables = {
  num?: number | null,
  after?: string | null,
  userRole?: UserRole | null,
};

export type ListUsersByRoleQuery = {
  listUsersByRole?:  {
    __typename: "UserConnection",
    users?:  Array< {
      __typename: "User",
      id: string,
      restaurantId: string,
      userRole: UserRole,
      email: string,
      createdAt: string,
    } | null > | null,
    cursor?: string | null,
  } | null,
};

export type ListRestaurantsQueryVariables = {
  num?: number | null,
  after?: string | null,
};

export type ListRestaurantsQuery = {
  listRestaurants?:  {
    __typename: "RestaurantConnection",
    cursor?: string | null,
    restaurants?:  Array< {
      __typename: "Restaurant",
      id: string,
      name: string,
    } | null > | null,
  } | null,
};

export type ListOrdersForUserQueryVariables = {
  userId: string,
  num?: number | null,
  after?: string | null,
};

export type ListOrdersForUserQuery = {
  listOrdersForUser?:  {
    __typename: "OrderConnection",
    cursor?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: string,
      userId: string,
      restaurantId: string,
      details: string,
      orderStatus: OrderStatus,
      orderDateTime: string,
    } | null > | null,
  } | null,
};

export type ListRestaurantOrdersByStatusQueryVariables = {
  restaurantId: string,
  orderStatus?: OrderStatus | null,
  num?: number | null,
  after?: string | null,
};

export type ListRestaurantOrdersByStatusQuery = {
  listRestaurantOrdersByStatus?:  {
    __typename: "OrderConnection",
    cursor?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: string,
      userId: string,
      restaurantId: string,
      details: string,
      orderStatus: OrderStatus,
      orderDateTime: string,
    } | null > | null,
  } | null,
};

export type ListOrdersForRestaurantQueryVariables = {
  restaurantId: string,
  num?: number | null,
  after?: string | null,
};

export type ListOrdersForRestaurantQuery = {
  listOrdersForRestaurant?:  {
    __typename: "OrderConnection",
    cursor?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: string,
      userId: string,
      restaurantId: string,
      details: string,
      orderStatus: OrderStatus,
      orderDateTime: string,
    } | null > | null,
  } | null,
};

export type ListMenusForRestaurantQueryVariables = {
  restaurantId: string,
  num?: number | null,
  after?: string | null,
};

export type ListMenusForRestaurantQuery = {
  listMenusForRestaurant?:  {
    __typename: "MenuConnection",
    cursor?: string | null,
    menus?:  Array< {
      __typename: "Menu",
      id: string,
      restaurantId: string,
      title: string,
      publishDate: string,
      menuStatus: MenuStatus,
    } | null > | null,
  } | null,
};

export type ListMenuItemsForMenuQueryVariables = {
  menuId: string,
  num?: number | null,
  after?: string | null,
};

export type ListMenuItemsForMenuQuery = {
  listMenuItemsForMenu?:  {
    __typename: "MenuItemConnection",
    cursor?: string | null,
    menuItems?:  Array< {
      __typename: "MenuItem",
      id: string,
      menuId: string,
      title: string,
      content: string,
    } | null > | null,
  } | null,
};
