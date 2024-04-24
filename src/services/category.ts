import instance from "@/configs/axios";
import { ICategory } from "@/interfaces/category";
export const addCategory = async (category: ICategory) => {
  try {
    const response = await instance.post(`/categories`, category, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const removeCategory = async (id: any) => {
  try {
    const response = await instance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCategoryById = async (id: any) => {
  try {
    const response = await instance.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const editCategory = async (category: ICategory) => {
  try {
    const response = await instance.patch(
      `/categories/${category._id}`,
      category,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
