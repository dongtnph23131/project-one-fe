import { IProduct } from "@/interfaces/product";
import { addItemToCart, getCartByUser } from "@/services/cart";
import { getAllProducts } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
const New = () => {
  const queryClient = useQueryClient();
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [
      "PRODUCTS_KEY",
      { limit: 100, page: 1, sort: "createdAt", order: "asc" },
    ],
    queryFn: getAllProducts,
  });
  const featuredProducts = products?.filter((product: IProduct) => {
    return product.featured == true;
  });
  const [userId, _] = useState(JSON.parse(localStorage.getItem("user")!)?._id);
  const { data } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartByUser,
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
      toast({ variant: "destructive", title: "Có lỗi xảy ra !" });
    },
  });
  if (isError) {
    return <p>Error ...</p>;
  }
  if (isLoading) {
    return (
      <div className="px-5 py-5">
        <Skeleton className="w-full h-[20px] rounded-full mt-5" />
        <Skeleton className="w-full h-[20px] rounded-full  mt-5" />
        <Skeleton className="w-full h-[20px] rounded-full mt-5" />
        <Skeleton className="w-full h-[20px] rounded-full mt-5" />
        <Skeleton className="w-full h-[20px] rounded-full mt-5" />
      </div>
    );
  }
  return (
    <section className="news">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Featured</h2>
        </div>
        <div className="section-body">
          <div className="product-list">
            {featuredProducts?.map((product: any, index: number) => {
              return (
                <div key={index + 1} className="product-item">
                  <div className="product-image">
                    <img
                      src={product?.image}
                      alt=""
                      className="product__thumbnail"
                    />
                    <span className="product-sale">{product?.discount}%</span>
                  </div>
                  <div className="product-info">
                    <h3 className="product__name">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/products/:id" + product._id}
                        className="product__link"
                      >
                        {product?.name}
                      </Link>
                    </h3>
                    <a href="" className="product__category">
                      Category
                    </a>
                    <div className="product-price">
                      <span className="product-price__new">
                        ${product?.priceSelling}
                      </span>
                      <span className="product-price__old">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn product-action__quickview">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/products/" + product._id}
                      >
                        QuickView
                      </Link>{" "}
                    </button>
                    <button
                      onClick={() => {
                        const userId = JSON.parse(
                          localStorage.getItem("user")!
                        )?._id;
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
                            title:
                              "Đăng nhập mới được thêm sản phẩm vào giỏ hàng !",
                          });
                        }
                      }}
                      className="btn product-action__addtocart"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default New;
