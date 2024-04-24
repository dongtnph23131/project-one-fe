import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { IProduct } from "@/interfaces/product";
import { addItemToCart } from "@/services/cart";
import { getAllCategories } from "@/services/category";
import { getAllProducts } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ShopPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [sort, setSort] = useState("asc");
  const [order, setOrder] = useState("createdAt");
  const [category, setCategory] = useState();
  const { toast } = useToast();
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["PRODUCTS_KEY", { limit, page, sort, order, category }],
    queryFn: getAllProducts,
  });
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
  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES_KEY"],
    queryFn: getAllCategories,
  });
  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:8080/api/v1/products`);
      if (page > Math.ceil(response.data.data.length / Number(limit))) {
        setPage(1);
        return;
      }
      if (page < 1) {
        setPage(Math.ceil(response.data.data.length / Number(limit)));
        return;
      }
    })();
  }, [page]);
  if (isError) {
    return <p>Error ...</p>;
  }
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <section className="news">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">All Products</h2>
          </div>
          <div className="px-5 py-5 flex">
            <Select
              onValueChange={(value: any) => {
                const values = value.split(" ");
                setSort(values[0]);
                setOrder(values[1]);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt desc">
                  Sản phẩm mới nhất
                </SelectItem>
                <SelectItem value="createdAt asc">Sản phẩm cũ nhất</SelectItem>
                <SelectItem value="priceSelling asc">Giá tăng dần</SelectItem>
                <SelectItem value="priceSelling desc">Giá giảm dần</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value: any) => {
                setCategory(value);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Lọc sản phẩm theo danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category: any, index: number) => {
                  return (
                    <SelectItem key={index + 1} value={category?._id}>
                      {category?.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="section-body">
            <div className="product-list">
              {products?.map((product: IProduct, index: number) => {
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
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={() => setPage(page - 1)}>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => setPage(page + 1)}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ShopPage;