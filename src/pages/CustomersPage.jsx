import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomersRequest } from "../redux/slices/customersSlice";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomersRequest());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-center text-2xl font-bold">Customers</h2>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Full Name</th>
            <th className="border-b px-4 py-2">Joined At</th>
            <th className="border-b px-4 py-2">Products Bought</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border-b px-4 py-2">{customer.userName}</td>
              <td className="border-b px-4 py-2">
                {new Date(customer.registeredAt).toLocaleDateString()}
              </td>
              <td className="border-b px-4 py-2">
                <table className="min-w-full border border-gray-300 bg-gray-100">
                  <thead>
                    <tr>
                      <th className="border-b px-2 py-1">Product</th>
                      <th className="border-b px-2 py-1">Qty</th>
                      <th className="border-b px-2 py-1">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.carts.map((cart) =>
                      cart.items.map((item) => (
                        <tr key={item._id}>
                          <td className="border-b px-2 py-1">
                            {item.product.name}
                          </td>
                          <td className="border-b px-2 py-1">
                            {item.quantity}
                          </td>
                          <td className="border-b px-2 py-1">
                            {new Date(cart.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
