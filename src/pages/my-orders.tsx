import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrdersByUser } from "@/services/order";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useState } from "react";
const MyOrders = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")!));
  const { data, isError, isLoading } = useQuery({
    queryKey: [user?._id],
    queryFn: getOrdersByUser,
  });
  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Error ...</p>;
  return (
    <div className="px-5 py-5">
      <div className="flex mx-5 my-5">
        <h1 className="text-3xl">Danh sách đơn hàng của tôi</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Đơn hàng</TableHead>
            <TableHead>Ngày giờ tạo</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order: any, index: number) => {
            return (
              <TableRow key={index + 1}>
                <TableHead>{order?.orderNumber}</TableHead>
                <TableHead>
                  {" "}
                  {format(new Date(order.createdAt), "dd MMM yyyy hh:mm")}
                </TableHead>
                <TableHead>{order?.customerName}</TableHead>
                <TableHead>{order?.customerPhone}</TableHead>
                <TableHead>{order?.status}</TableHead>
                <TableHead>{order?.totalPrice}</TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                      >
                        <DotsHorizontalIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem asChild>
                        <Link to={`/orders/${order._id}/user`}>
                          Xem chi tiết
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrders;
