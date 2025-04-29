import { ICustomer } from "./customer-data";

export interface IEditCustomerStore {
  selectedCustomer: ICustomer | null;
  setSelectedCustomer: (customer: ICustomer) => void;
  clearSelectedCustomer: () => void;
}
