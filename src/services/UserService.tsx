import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateUserInput,
  User,
  UpdateUserInput,
  ListUsersQuery,
  ListUsersByRoleQuery,
  UserRole
} from '../API';
import { createUser, deleteUser, updateUser } from '../graphql/mutations';
import { listUsers, listUsersByRole, getUser } from '../graphql/queries';

class UserService {
  async listUsers(): Promise<ListUsersQuery> {
    try {
      const response: { data: ListUsersQuery } = (await API.graphql(
        graphqlOperation(listUsers)
      )) as {
        data: ListUsersQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing listUsers', error);
      throw error;
    }
  }
  async listUsersByRole(userRole: UserRole): Promise<ListUsersByRoleQuery> {
    try {
      const response: { data: ListUsersByRoleQuery } = (await API.graphql(
        graphqlOperation(listUsersByRole, {
          userRole: userRole
        })
      )) as {
        data: ListUsersByRoleQuery;
      };
      return response.data;
    } catch (error) {
      console.log('Error executing ListUsersByRoleQuery', error);
      throw error;
    }
  }
  async createUser(user: CreateUserInput): Promise<User> {
    try {
      const response: { data: any } = (await API.graphql(
        graphqlOperation(createUser, {
          input: {
            ...user
          }
        })
      )) as { data: any };
      return response.data.createUser;
    } catch (error) {
      console.log('Error executing createUser', error);
      throw error;
    }
  }
  async deleteUser(id: string): Promise<User> {
    try {
      const response: { data: User } = (await API.graphql(
        graphqlOperation(deleteUser, {
          input: {
            id: id
          }
        })
      )) as { data: User };
      return response.data;
    } catch (error) {
      console.log('Error executing deleteUser', error);
      throw error;
    }
  }
  async getUser(id: string): Promise<User> {
    try {
      const response: { data: User } = (await API.graphql(
        graphqlOperation(getUser, {
          id: id
        })
      )) as { data: User };
      return response.data;
    } catch (error) {
      console.log('Error executing getUser', error);
      throw error;
    }
  }
  async updateUser(newData: UpdateUserInput): Promise<User> {
    try {
      const response: { data: User } = (await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: newData.id,
            restaurantId: newData.restaurantId
          }
        })
      )) as { data: User };
      return response.data;
    } catch (error) {
      console.log('Error executing updateUser', error);
      throw error;
    }
  }
}
export default new UserService();
