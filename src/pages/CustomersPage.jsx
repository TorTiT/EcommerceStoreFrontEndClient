import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomersRequest } from "../redux/slices/customersSlice";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomersRequest());
  }, [dispatch]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
        <span className="text-indigo-600">Customers</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Joined At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Products Bought
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {customer.userName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(customer.registeredAt).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-gray-50">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Product
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Qty
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {customer.carts.map((cart) =>
                          cart.items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-100">
                              <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
                                {item.product.name}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-500">
                                {new Date(cart.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;
