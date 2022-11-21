import { Order } from '../../API';

export type OrderData = {
  orderList: Order[] | [];
  singleOrder: Order;
  loading: boolean;
};
