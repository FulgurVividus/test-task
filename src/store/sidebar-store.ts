// active sidebar (add OR edit bars)

import { ISidebarStore } from "@/utils/sidebar-store-data";
import { create } from "zustand";

export const useActiveSidebarStore = create<ISidebarStore>((set) => ({
  isAddCustomerSidebar: true,
  toggleSidebar: () =>
    set((state) => ({ isAddCustomerSidebar: !state.isAddCustomerSidebar })),
}));
