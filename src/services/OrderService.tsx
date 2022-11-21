import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateOrderInput,
  Order,
  UpdateOrderInput,
  ListOrdersForUserQuery,
  ListOrdersForRestaurantQuery,
  ListRestaurantOrdersByStatusQuery,
  OrderStatus,
  GetOrderQuery
} from '../API';
import { createOrder, updateOrder } from '../graphql/mutations';
import {
  getOrder,
  listOrdersForUser,
  listRestaurantOrdersByStatus,
  listOrdersForRestaurant
} from '../graphql/queries';

class OrderService {
  async listOrdersForUser(userId: string): Promise<ListOrdersForUserQuery> {
    try {
      const response: { data: ListOrdersForUserQuery } = (await API.graphql(
        graphqlOperation(listOrdersForUser, {
          userId,
          num: 10
        })
      )) as {
        data: ListOrdersForUserQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing listOrdersForUser', error);
      throw error;
    }
  }
  async listOrdersForRestaurant(restaurantId: string): Promise<ListOrdersForRestaurantQuery> {
    try {
      const response: { data: ListOrdersForRestaurantQuery } = (await API.graphql(
        graphqlOperation(listOrdersForRestaurant, {
          restaurantId,
          num: 10
        })
      )) as {
        data: ListOrdersForRestaurantQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing listOrdersForRestaurant', error);
      throw error;
    }
  }
  async listRestaurantOrdersByStatus(
    restaurantId: string,
    orderStatus: OrderStatus
  ): Promise<ListRestaurantOrdersByStatusQuery> {
    try {
      const response: { data: ListRestaurantOrdersByStatusQuery } = (await API.graphql(
        graphqlOperation(listRestaurantOrdersByStatus, {
          restaurantId,
          orderStatus,
          num: 10
        })
      )) as {
        data: ListRestaurantOrdersByStatusQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing listRestaurantOrdersByStatus', error);
      throw error;
    }
  }
  async getOrderById(id: string): Promise<GetOrderQuery> {
    try {
      const response: { data: GetOrderQuery } = (await API.graphql(
        graphqlOperation(getOrder, {
          id
        })
      )) as {
        data: GetOrderQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing getOrderById', error);
      throw error;
    }
  }
  async createOrder(order: CreateOrderInput): Promise<Order> {
    try {
      const response: { data: Order } = (await API.graphql(
        graphqlOperation(createOrder, {
          input: {
            ...order
          }
        })
      )) as { data: Order };
      return response.data;
    } catch (error) {
      console.log('Error executing createOrder', error);
      throw error;
    }
  }
  async updateOrder(order: UpdateOrderInput): Promise<Order> {
    try {
      const response: { data: Order } = (await API.graphql(
        graphqlOperation(updateOrder, {
          input: {
            ...order
          }
        })
      )) as { data: Order };
      return response.data;
    } catch (error) {
      console.log('Error executing updateOrder', error);
      throw error;
    }
  }
}
export default new OrderService();
