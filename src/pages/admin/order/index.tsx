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
import { getAllOrders } from "@/services/order";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
let limit = 5;
const OrderPageAdmin = () => {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  useEffect(() => {
    if (page > Math.ceil(data?.length / Number(limit))) {
      setPage(1);
      return;
    }
    if (page < 1) {
      setPage(Math.ceil(data?.length / Number(limit)));
      return;
    }
    if (q && !status) {
      setOrders(
        data?.slice((page - 1) * limit, page * limit)?.filter((item: any) => {
          return item?.orderNumber?.includes(q);
        })
      );
      return;
    }
    if (status && !q) {
      setOrders(
        data
          ?.slice((page - 1) * limit, page * limit)
          .filter((i: any) => i?.status === status)
      );
      return;
    }
    if (status && q) {
      setOrders(
        data
          ?.slice((page - 1) * limit, page * limit)
          .filter((i: any) => i?.status === status)
          ?.filter((item: any) => {
            return item?.orderNumber?.includes(q);
          })
      );
      return;
    }
    setOrders(data?.slice((page - 1) * limit, page * limit));
  }, [page, data, q, status]);
  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Error ...</p>;
  return (
    <div className="px-5 py-5">
      <div className="flex mx-5 my-5">
        <h1 className="text-3xl">Danh sách đơn hàng</h1>
      </div>
      <div className="flex items-center gap-5">
        <Input
          placeholder="Tìm kiếm đơn hàng theo mã đơn hàng"
          className="w-1/2"
          value={q}
          onChange={(e: any) => {
            setQ(e.target.value);
          }}
        />
        <div className="flex gap-5">
          <Button
            onClick={() => setStatus("")}
            variant={`${status === "" ? "default" : "secondary"}`}
          >
            All
          </Button>
          <Button
            variant={`${status === "pending" ? "default" : "secondary"}`}
            onClick={() => setStatus("pending")}
          >
            pending
          </Button>
          <Button
            variant={`${status === "confirmed" ? "default" : "secondary"}`}
            onClick={() => setStatus("confirmed")}
          >
            confirmed
          </Button>
          <Button
            variant={`${status === "shipped" ? "default" : "secondary"}`}
            onClick={() => setStatus("shipped")}
          >
            shipped
          </Button>
          <Button
            variant={`${status === "delivered" ? "default" : "secondary"}`}
            onClick={() => setStatus("delivered")}
          >
            delivered
          </Button>
          <Button
            variant={`${status === "cancelled" ? "default" : "secondary"}`}
            onClick={() => setStatus("cancelled")}
          >
            cancelled
          </Button>
        </div>
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
          {orders?.map((order: any, index: number) => {
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
                        <Link to={`/admin/orders/${order._id}`}>
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
    </div>
  );
};

export default OrderPageAdmin;
