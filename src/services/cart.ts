import instance from "@/configs/axios";
export const addItemToCart = async (data: any) => {
  try {
    const response = await instance.post("/carts/add-to-cart", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCartByUser = async (data: any) => {
  try {
    const response = await instance.get(`carts/${data.queryKey[1]}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const decreaseProductQuantity = async (data: any) => {
  try {
    const response = await instance.post("/carts/decrease", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const removeItemCart = async (data: any) => {
  try {
    const response = await instance.post("/carts/remove-item", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
