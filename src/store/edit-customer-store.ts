import { create } from "zustand";
import { IEditCustomerStore } from "../utils/edit-customer-data";

export const useEditCustomerStore = create<IEditCustomerStore>((set) => ({
  selectedCustomer: null,
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  clearSelectedCustomer: () => set({ selectedCustomer: null }),
}));
