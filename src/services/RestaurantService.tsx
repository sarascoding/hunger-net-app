import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
  Restaurant,
  ListRestaurantsQuery
} from '../API';
import { createRestaurant, deleteRestaurant, updateRestaurant } from '../graphql/mutations';
import { getRestaurant, listRestaurants } from '../graphql/queries';

class RestaurantService {
  async listRestaurants(): Promise<ListRestaurantsQuery> {
    try {
      const response: { data: ListRestaurantsQuery } = (await API.graphql(
        graphqlOperation(listRestaurants)
      )) as {
        data: ListRestaurantsQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing ListRestaurantsQuery', error);
      throw error;
    }
  }
  async createRestaurant(restaurant: CreateRestaurantInput): Promise<Restaurant> {
    try {
      const response: { data: Restaurant } = (await API.graphql(
        graphqlOperation(createRestaurant, {
          input: {
            ...restaurant
          }
        })
      )) as { data: Restaurant };
      return response.data;
    } catch (error) {
      console.log('Error executing createRestaurant', error);
      throw error;
    }
  }
  async deleteRestaurant(id: string): Promise<Restaurant> {
    try {
      const response: { data: Restaurant } = (await API.graphql(
        graphqlOperation(deleteRestaurant, {
          input: {
            id: id
          }
        })
      )) as { data: Restaurant };
      return response.data;
    } catch (error) {
      console.log('Error executing deleteRestaurant', error);
      throw error;
    }
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    try {
      const response: { data: Restaurant } = (await API.graphql(
        graphqlOperation(getRestaurant, {
          id: id
        })
      )) as { data: Restaurant };
      return response.data;
    } catch (error) {
      console.log('Error executing getRestaurant', error);
      throw error;
    }
  }

  async updateRestaurant(restaurant: UpdateRestaurantInput): Promise<Restaurant> {
    try {
      const response: { data: Restaurant } = (await API.graphql(
        graphqlOperation(updateRestaurant, {
          input: {
            ...restaurant
          }
        })
      )) as { data: Restaurant };
      return response.data;
    } catch (error) {
      console.log('Error executing updateRestaurant', error);
      throw error;
    }
  }
}
export default new RestaurantService();
