import React from "react";
import { useActiveSidebarStore } from "../store/sidebar-store";
import AddCustomer from "./sidebar/AddCustomer";
import EditCustomer from "./sidebar/EditCustomer";

const Sidebar: React.FC = () => {
  const { isAddCustomerSidebar } = useActiveSidebarStore();

  return (
    <>
      <aside>{isAddCustomerSidebar ? <AddCustomer /> : <EditCustomer />}</aside>
    </>
  );
};

export default Sidebar;
