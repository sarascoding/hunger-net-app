/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      restaurantId
      userRole
      email
      createdAt
      orders {
        cursor
      }
    }
  }
`;
export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      menus {
        cursor
      }
      orders {
        cursor
      }
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      userId
      restaurantId
      details
      orderStatus
      orderDateTime
    }
  }
`;
export const getMenuPerRestaurant = /* GraphQL */ `
  query GetMenuPerRestaurant($restaurantId: String!, $id: String!) {
    getMenuPerRestaurant(restaurantId: $restaurantId, id: $id) {
      id
      restaurantId
      title
      publishDate
      menuStatus
      menuItems {
        cursor
      }
    }
  }
`;
export const listMenuItems = /* GraphQL */ `
  query ListMenuItems($num: Int, $after: String) {
    listMenuItems(num: $num, after: $after) {
      cursor
      menuItems {
        id
        menuId
        title
        content
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers($num: Int, $after: String) {
    listUsers(num: $num, after: $after) {
      users {
        id
        restaurantId
        userRole
        email
        createdAt
      }
      cursor
    }
  }
`;
export const listUsersByRole = /* GraphQL */ `
  query ListUsersByRole($num: Int, $after: String, $userRole: UserRole) {
    listUsersByRole(num: $num, after: $after, userRole: $userRole) {
      users {
        id
        restaurantId
        userRole
        email
        createdAt
      }
      cursor
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants($num: Int, $after: String) {
    listRestaurants(num: $num, after: $after) {
      cursor
      restaurants {
        id
        name
      }
    }
  }
`;
export const listOrdersForUser = /* GraphQL */ `
  query ListOrdersForUser($userId: String!, $num: Int, $after: String) {
    listOrdersForUser(userId: $userId, num: $num, after: $after) {
      cursor
      orders {
        id
        userId
        restaurantId
        details
        orderStatus
        orderDateTime
      }
    }
  }
`;
export const listRestaurantOrdersByStatus = /* GraphQL */ `
  query ListRestaurantOrdersByStatus(
    $restaurantId: String!
    $orderStatus: OrderStatus
    $num: Int
    $after: String
  ) {
    listRestaurantOrdersByStatus(
      restaurantId: $restaurantId
      orderStatus: $orderStatus
      num: $num
      after: $after
    ) {
      cursor
      orders {
        id
        userId
        restaurantId
        details
        orderStatus
        orderDateTime
      }
    }
  }
`;
export const listOrdersForRestaurant = /* GraphQL */ `
  query ListOrdersForRestaurant(
    $restaurantId: String!
    $num: Int
    $after: String
  ) {
    listOrdersForRestaurant(
      restaurantId: $restaurantId
      num: $num
      after: $after
    ) {
      cursor
      orders {
        id
        userId
        restaurantId
        details
        orderStatus
        orderDateTime
      }
    }
  }
`;
export const listMenusForRestaurant = /* GraphQL */ `
  query ListMenusForRestaurant(
    $restaurantId: String!
    $num: Int
    $after: String
  ) {
    listMenusForRestaurant(
      restaurantId: $restaurantId
      num: $num
      after: $after
    ) {
      cursor
      menus {
        id
        restaurantId
        title
        publishDate
        menuStatus
      }
    }
  }
`;
export const listMenuItemsForMenu = /* GraphQL */ `
  query ListMenuItemsForMenu($menuId: String!, $num: Int, $after: String) {
    listMenuItemsForMenu(menuId: $menuId, num: $num, after: $after) {
      cursor
      menuItems {
        id
        menuId
        title
        content
      }
    }
  }
`;
