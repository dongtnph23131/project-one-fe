import instance from "@/configs/axios";

export const signup = async (user: any) => {
  try {
    const response = await instance.post("/auth/signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const signin = async (user: any) => {
    try {
      const response = await instance.post("/auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };