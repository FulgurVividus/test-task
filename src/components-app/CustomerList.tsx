import { ICustomer } from "@/utils/customer-data";
import React from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useActiveSidebarStore } from "../store/sidebar-store";
import { useEditCustomerStore } from "../store/edit-customer-store";

const CustomerList: React.FC = () => {
  const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
  const { toggleSidebar } = useActiveSidebarStore();
  const { setSelectedCustomer, selectedCustomer } = useEditCustomerStore();

  function editCustomer(customer: ICustomer) {
    setSelectedCustomer(customer);

    if (!selectedCustomer) {
      toggleSidebar();
    }
  }

  function deleteCustomer(email: string) {
    const updatedCustomers = storedCustomers.filter(
      (customer: ICustomer) => customer.email !== email
    );

    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    window.location.reload();
  }

  return (
    <>
      {/* Customer List */}
      <div className="w-2/3 p-6">
        <h2 className="text-xl font-semibold mb-6">Customers</h2>

        <div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  <div className="flex items-center">Name</div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Company
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Admin
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {storedCustomers.map((customer: ICustomer) => (
                <tr key={customer.email}>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div>
                        {customer.firstName} {customer.lastName}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{customer.company}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">
                    <div
                      className={`w-12 h-6 rounded-4xl ${
                        customer.isAdmin ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    ></div>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      {/* Edit */}
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                        title="Edit"
                        onClick={() => {
                          editCustomer(customer);
                        }}
                      >
                        <CiEdit size={20} />
                      </button>
                      {/* Delete */}
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                        title="Delete"
                        onClick={() => {
                          deleteCustomer(customer.email);
                        }}
                      >
                        <CiTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
