import instance from "@/configs/axios";

export const createOrder = async (data: any) => {
  try {
    const response = await instance.post("/orders", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllOrders = async () => {
  try {
    const response = await instance.get("/orders");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrderById = async (data: any) => {
  const [orderId] = data.queryKey;
  try {
    const response = await instance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateOrderStatusAdmin = async (data: any) => {
  try {
    const response = await instance.patch(
      `/orders/${data.orderId}/update-admin-status`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrdersByUser = async (userId: any) => {
  try {
    const response = await instance.get(`/orders/${userId.queryKey[0]}/user`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
