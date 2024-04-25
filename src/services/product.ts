import instance from "@/configs/axios";
import { IProduct } from "@/interfaces/product";

export const getAllProducts = async (params: any): Promise<IProduct[]> => {
  const { page, limit, sort, order, category } = params.queryKey[1];
  const queryCategory = category ? `&_category=${category}` : "";
  try {
    const response = await instance.get(
      `/products?_page=${page}&_limit=${limit}&_order=${order}&_sort=${sort}${queryCategory}`
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};
export const getProduct = async (id: number | string) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product: IProduct) => {
  try {
    const response = await instance.post(`/products`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const removeProductById = async (id: any) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (product: IProduct) => {
  try {
    const response = await instance.patch(`/products/${product._id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
