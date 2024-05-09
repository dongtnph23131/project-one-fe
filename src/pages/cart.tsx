import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUser,
  removeItemCart,
} from "@/services/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
const CartPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [userId, _] = useState(JSON.parse(localStorage.getItem("user")!)?._id);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartByUser,
  });
  const mutation = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
  const mutateDecreamentQuantity = useMutation({
    mutationFn: decreaseProductQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
  const mutateRemoveItemCart = useMutation({
    mutationFn: removeItemCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
  const total = data?.products?.reduce(
    (accumulator: any, currentValue: any) => {
      return Number(
        currentValue.priceSelling * currentValue.quantity + accumulator
      );
    },
    0
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!data?.products)
    return (
      <div className="flex justify-center text-3xl">
        {" "}
        <Link to={"/shop"}>
          <Button>Chưa có sản phẩm nào trong giỏ hàng</Button>
        </Link>
      </div>
    );
  return (
    <>
      {userId ? (
        <>
          {data?.products?.length > 0 ? (
            <div className="px-5 py-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Ảnh sản phẩm</TableHead>
                    <TableHead>Số lượng sản phẩm</TableHead>
                    <TableHead>Giá sản phẩm</TableHead>
                    <TableHead>Tổng giá sản phẩm</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.products?.map((item: any, index: number) => {
                    return (
                      <TableRow key={index + 1}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>
                          <img style={{ width: "70px" }} src={item?.image} />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            className="mr-2"
                            onClick={() => {
                              mutateDecreamentQuantity.mutate({
                                userId,
                                productId: item?.productId,
                              });
                            }}
                          >
                            -
                          </Button>
                          {item?.quantity}
                          <Button
                            onClick={() => {
                              if (item?.quantity === 0) {
                                toast({
                                  variant: "destructive",
                                  title: "Sản phẩm hết hàng !",
                                });
                                return;
                              }
                              if (item?.quantity + 1 > item?.countInStock) {
                                toast({
                                  variant: "destructive",
                                  title: "Quá số lượng tồn kho !",
                                });
                                return;
                              }
                              mutation.mutate({
                                userId,
                                quantity: 1,
                                productId: item?.productId,
                              });
                            }}
                            className="ml-2"
                          >
                            +
                          </Button>
                        </TableCell>
                        <TableCell>{item?.priceSelling}</TableCell>
                        <TableCell>
                          {item?.priceSelling * item?.quantity}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              mutateRemoveItemCart.mutate({
                                userId,
                                productId: item?.productId,
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-center gap-10 mx-5 my-5">
                <h2 className="text-3xl">Total : {total}</h2>
                <Link to={"/order"}>
                  <Button>Tiếp mục mua hàng</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link to={"/shop"}>
                <Button>Chưa có sản phẩm nào trong giỏ hàng</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <h1>Bạn cần đăng nhập</h1>
        </div>
      )}
    </>
  );
};

export default CartPage;
