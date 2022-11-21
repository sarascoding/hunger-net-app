/* eslint-disable camelcase */
export const authStatusBag = (type, message) => ({
  type: type,
  message: message
});

export const filterAdminUsers = (userList) => {
  return userList.filter((user) => user.userRole !== 'ADMIN');
};

export const transformUserListToListItems = (userList) => {
  return userList.map((user) => {
    const { id, createdAt, email, userRole } = user;
    return {
      id,
      title: email,
      subheader: createdAt,
      description: userRole
    };
  });
};

export const transformMenuListToListItems = (menuList) => {
  return menuList.map((menu) => {
    const { id, publishDate, title, menuStatus } = menu;
    return {
      id,
      title,
      subheader: menuStatus,
      description: publishDate
    };
  });
};
export const transformRestaurantListToListItems = (list) => {
  return list.map((restaurant) => {
    const { id, name } = restaurant;
    return {
      id,
      title: name
    };
  });
};
export const transformMenuItemsToListItems = (list) => {
  return list.map((menuItem) => {
    const { id, title, content } = menuItem;
    return {
      id,
      title,
      subheader: content
    };
  });
};

export const transformOrderListToListItems = (list) => {
  return list.map((order) => {
    const { id, userId, restaurantId, details, orderStatus, orderDateTime } = order;
    return {
      id,
      title: details,
      subheader: orderStatus,
      description: orderDateTime
    };
  });
};
export const getUserAttributes = (user) => {
  const { attributes, username, signInUserSession } = user;
  const { preferred_username, sub, email } = attributes;
  // custom orgs and role from attributes
  const token = signInUserSession.idToken.jwtToken || null;
  const role = attributes['custom:custom_role'];
  const restaurantId = attributes['custom:custom_restaurantId'];
  const userId = attributes['custom:custom_userId'];
  const orgName = signInUserSession.idToken.payload.orgs;
  return {
    preferred_username,
    username,
    token,
    email,
    restaurantId,
    id: sub,
    role,
    userId,
    orgName
  };
};
