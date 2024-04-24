import { IProduct } from "@/interfaces/product";
import { addItemToCart } from "@/services/cart";
import { getAllProducts } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const New = () => {
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
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      toast({
        title: "Sản phẩm đã được thêm vào giỏ hàng",
      });
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
    <section className="news">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Featured</h2>
        </div>
        <div className="section-body">
          <div className="product-list">
            {featuredProducts?.map((product: IProduct, index: number) => {
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
                        mutation.mutate({
                          productId: product?._id,
                          userId,
                          quantity: 1,
                        });
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
