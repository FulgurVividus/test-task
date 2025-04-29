import { ICustomer } from "@/utils/customer-data";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";

const AddCustomer: React.FC = () => {
  const [newCustomer, setNewCustomer] = useState<ICustomer>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<ICustomer>({
    defaultValues: {
      isAdmin: false,
    },
  });

  function onSubmit(data: ICustomer) {
    alert("Customer created successfully");

    const existingCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    ) as ICustomer[];
    const updatedCustomers = [...existingCustomers, data];

    localStorage.setItem("customers", JSON.stringify(updatedCustomers));

    //
    setNewCustomer({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    reset();

    window.location.reload();
  }

  function togglePassword() {
    const eyeToggle = document.getElementById("password") as HTMLInputElement;

    if (eyeToggle.type === "password") {
      eyeToggle.type = "text";
    } else {
      eyeToggle.type = "password";
    }
  }

  return (
    <>
      {/* Add Customer Form */}
      <div className="w-1/3 border-r border-gray-200 bg-white min-w-full h-full p-6">
        <h2 className="text-xl font-semibold mb-6">Add Customer</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("firstName", { required: "Required" })}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
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
                {...register("lastName", { required: "Required" })}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
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
              {...register("company", { required: "Required" })}
            />
            {errors.company && (
              <p className="text-red-600 text-xs mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* STATUS */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <input
              type="hidden"
              {...register("isAdmin", {
                validate: (value) =>
                  value === true || value === false || "Required",
              })}
            />
            <div className="grid grid-cols-2 gap-0">
              <div
                className={`flex items-center justify-center p-2 border border-gray-300 rounded-l-md bg-gray-100 cursor-pointer ${
                  !newCustomer.isAdmin ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setNewCustomer({ ...newCustomer, isAdmin: false });
                  setValue("isAdmin", false);
                }}
              >
                <span
                  className={`${
                    !newCustomer.isAdmin ? "text-black" : "text-gray-500"
                  }`}
                >
                  User
                </span>
              </div>
              <div
                className={`flex items-center justify-center p-2 border border-gray-300 rounded-r-md bg-gray-100 cursor-pointer ${
                  newCustomer.isAdmin ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setNewCustomer({ ...newCustomer, isAdmin: true });
                  setValue("isAdmin", true);
                }}
              >
                <span
                  className={`${
                    newCustomer.isAdmin ? "text-black" : "text-gray-500"
                  }`}
                >
                  Admin
                </span>
              </div>
            </div>
            {errors.isAdmin && (
              <p className="text-red-600 text-xs mt-1">
                {errors.isAdmin.message}
              </p>
            )}
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
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("password", {
                  required: "Required",
                  minLength: {
                    value: 8,
                    message: "8+ characters",
                  },
                })}
              />
              <FaRegEyeSlash
                size={15}
                className="absolute right-2 top-3 cursor-pointer"
                onClick={togglePassword}
              />
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">8+ characters</p>
          </div>

          {/* SAVE */}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer mt-6"
            title="Save"
            type="submit"
          >
            Save
          </button>
          {/* CANCEL */}
          <button
            className="w-full bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition-colors cursor-pointer mt-6"
            title="Cancel"
            type="reset"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
