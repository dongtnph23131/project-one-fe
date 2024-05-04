import { useToast } from "@/components/ui/use-toast";
import { addItemToCart, getCartByUser } from "@/services/cart";
import { getProduct } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [userId, _] = useState(JSON.parse(localStorage.getItem("user")!)?._id);
  const { data } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartByUser,
  });
  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["PRODUCTS_KEY", id],
    queryFn: async () => {
      return await getProduct(id as number | string);
    },
  });
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      toast({
        title: "Sản phẩm đã được thêm vào giỏ hàng",
      });
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    },
  });
  if (isError) {
    return <p>Error ...</p>;
  }
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category?.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.name}
            </h1>
            <span className="text-gray-600 ml-3">
              Stock : {product?.countInStock}
            </span>
            <p className="leading-relaxed">{product?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex"></div>
              <div className="flex ml-6 items-center"></div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product?.priceSelling}
              </span>
              <button
                onClick={() => {
                  const userId = JSON.parse(localStorage.getItem("user")!)?._id;
                  if (userId) {
                    const product_item_cart = data?.products?.find(
                      (item: any) => item?.productId === product?._id
                    );
                    if (product?.countInStock === 0) {
                      toast({
                        variant: "destructive",
                        title: "Sản phẩm hết hàng !",
                      });
                      return;
                    }
                    if (
                      product_item_cart?.quantity + 1 >
                      product?.countInStock
                    ) {
                      toast({
                        variant: "destructive",
                        title: "Quá số lượng tồn kho !",
                      });
                      return;
                    }
                    mutation.mutate({
                      productId: product?._id,
                      userId,
                      quantity: 1,
                    });
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Đăng nhập mới được thêm sản phẩm vào giỏ hàng !",
                    });
                  }
                }}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
