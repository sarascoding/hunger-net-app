import { Restaurant } from '../../API';

export type RestaurantData = {
  restaurantList: Restaurant[];
  loading: boolean;
  status: string;
  restaurant: Restaurant;
};
