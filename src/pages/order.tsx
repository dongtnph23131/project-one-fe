import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { getCartByUser } from "@/services/cart";
import { createOrder } from "@/services/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().min(6, {
    message: "Cần nhập tên người nhận trên 6 kí tự",
  }),
  address: z.string(),
  phone: z.string(),
  email: z.string().email({
    message: "Sai địng dạng email",
  }),
});
const OrderPage = () => {
  const [userId, _] = useState(JSON.parse(localStorage.getItem("user")!)?._id);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartByUser,
  });
  const total = data?.products.reduce((accumulator: any, currentValue: any) => {
    return Number(
      currentValue.priceSelling * currentValue.quantity + accumulator
    );
  }, 0);
  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast({
        title: "Đặt hàng thành công",
      });
      navigate("/");
    },
    onError: () => {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
  });
  const onSubmit = (dataForm: any) => {
    const items = data?.products?.map((item: any) => {
      return {
        productId: item.productId,
        name: item.name,
        price: item.priceSelling,
        image: item.image,
        quantity: item.quantity,
      };
    });
    const dataReq = {
      userId,
      customerName: dataForm.name,
      email:dataForm.email,
      customerPhone: dataForm.phone,
      address: dataForm.address,
      totalPrice: total,
      items,
    };
    mutation.mutate(dataReq);
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <>
      {userId ? (
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.products?.map((item: any, index: number) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      <img style={{ width: "70px" }} src={item?.image} />
                    </TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>{item?.priceSelling}</TableCell>
                    <TableCell>{item?.priceSelling * item?.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <h2 className="text-3xl">Total : {total}</h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người nhận</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Số điện thoại"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ nhập hàng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{mutation.isPending?'Loading ...':'Hoàn thành đơn hàng'}</Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex justify-center">
          <h1 className="text-3xl">Bạn cần đăng nhập</h1>
        </div>
      )}
    </>
  );
};

export default OrderPage;
