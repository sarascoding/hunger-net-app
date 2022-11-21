/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant($input: CreateRestaurantInput) {
    createRestaurant(input: $input) {
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
export const createMenu = /* GraphQL */ `
  mutation CreateMenu($input: CreateMenuInput) {
    createMenu(input: $input) {
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
export const createMenuItem = /* GraphQL */ `
  mutation CreateMenuItem($input: CreateMenuItemInput) {
    createMenuItem(input: $input) {
      id
      menuId
      title
      content
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput) {
    createOrder(input: $input) {
      id
      userId
      restaurantId
      details
      orderStatus
      orderDateTime
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
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
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant($input: UpdateRestaurantInput) {
    updateRestaurant(input: $input) {
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
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu($input: UpdateMenuInput) {
    updateMenu(input: $input) {
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
export const updateMenuItem = /* GraphQL */ `
  mutation UpdateMenuItem($input: UpdateMenuItemInput) {
    updateMenuItem(input: $input) {
      id
      menuId
      title
      content
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder($input: UpdateOrderInput) {
    updateOrder(input: $input) {
      id
      userId
      restaurantId
      details
      orderStatus
      orderDateTime
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput) {
    deleteUser(input: $input) {
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
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant($input: DeleteRestaurantInput) {
    deleteRestaurant(input: $input) {
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
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu($input: DeleteMenuInput) {
    deleteMenu(input: $input) {
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
export const deleteMenuItem = /* GraphQL */ `
  mutation DeleteMenuItem($input: DeleteMenuItemInput) {
    deleteMenuItem(input: $input) {
      id
      menuId
      title
      content
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder($input: DeleteOrderInput) {
    deleteOrder(input: $input) {
      id
      userId
      restaurantId
      details
      orderStatus
      orderDateTime
    }
  }
`;
