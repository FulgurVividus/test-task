import { ICustomer } from "@/utils/customer-data";
import { useEditCustomerStore } from "../../store/edit-customer-store";
import { useActiveSidebarStore } from "../../store/sidebar-store";
import React, { useState } from "react";

const EditCustomer: React.FC = () => {
  const { toggleSidebar } = useActiveSidebarStore();
  const { selectedCustomer, clearSelectedCustomer } = useEditCustomerStore();
  const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");

  const [updatedCustomer, setUpdatedCustomer] = useState<ICustomer>(
    selectedCustomer ?? {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      password: "",
      isAdmin: false,
    }
  );

  function handleEdit() {
    const updatedCustomers = storedCustomers.map((customer: ICustomer) =>
      customer.email === updatedCustomer.email ? updatedCustomer : customer
    );

    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    window.location.reload();
  }

  return (
    <>
      {/* Edit Customer Form */}
      <div className="w-1/3 border-r border-gray-200 bg-white min-w-full h-full p-6">
        <h2 className="text-xl font-semibold mb-6">Edit Customer</h2>

        <form key={selectedCustomer?.email}>
          {/* FIRST/LAST NAME */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={selectedCustomer?.firstName}
                onChange={(e) =>
                  setUpdatedCustomer({
                    ...updatedCustomer,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={selectedCustomer?.lastName}
                onChange={(e) =>
                  setUpdatedCustomer({
                    ...updatedCustomer,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* COMPANY */}
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={selectedCustomer?.company}
              onChange={(e) =>
                setUpdatedCustomer({
                  ...updatedCustomer,
                  company: e.target.value,
                })
              }
            />
          </div>

          {/* STATUS */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <div className="grid grid-cols-2 gap-0">
              {/* User */}
              <div
                className={`flex items-center justify-center p-2 border border-gray-300 rounded-l-md bg-gray-100 cursor-pointer ${
                  !updatedCustomer?.isAdmin ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setUpdatedCustomer({ ...updatedCustomer, isAdmin: false });
                }}
              >
                <span
                  className={`${
                    !selectedCustomer?.isAdmin ? "text-black" : "text-gray-500"
                  }`}
                >
                  User
                </span>
              </div>
              {/* Admin */}
              <div
                className={`flex items-center justify-center p-2 border border-gray-300 rounded-r-md bg-gray-100 cursor-pointer ${
                  updatedCustomer?.isAdmin ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setUpdatedCustomer({ ...updatedCustomer, isAdmin: true });
                }}
              >
                <span
                  className={`${
                    selectedCustomer?.isAdmin ? "text-black" : "text-gray-500"
                  }`}
                >
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={selectedCustomer?.email}
              onChange={(e) =>
                setUpdatedCustomer({
                  ...updatedCustomer,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* SAVE */}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer mt-6"
            title="Save"
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              toggleSidebar();
              handleEdit();
              clearSelectedCustomer();
            }}
          >
            Save
          </button>
          {/* CANCEL */}
          <button
            className="w-full bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition-colors cursor-pointer mt-6"
            title="Cancel"
            type="reset"
            onClick={() => {
              toggleSidebar();
              clearSelectedCustomer();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCustomer;
