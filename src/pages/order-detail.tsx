import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderById, updateOrderStatusAdmin } from "@/services/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
const MyOrderDetail = () => {
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: [orderId],
    queryFn: getOrderById,
  });
  const mutation = useMutation({
    mutationFn: updateOrderStatusAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [orderId] });
    },
  });
  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Error ...</p>;
  return (
    <>
      <div className="flex justify-between items-center mb-1 mx-5 my-5">
        <Link to={"/order"}>
          <Button variant="ghost" className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
      </div>
      <div className="mx-5 my-5">
        <Card>
          <div className="flex justify-between p-6">
            <CardHeader className="p-0">
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 self-center rounded-full bg-yellow-400"></div>
                <span className="ml-2 text-sm">{data?.status}</span>
              </div>
              {data?.status === "pending" || data?.status === "confirmed" ? (
                <Button
                  onClick={() => {
                    mutation.mutate({
                      status: "cancelled",
                      orderId,
                    });
                  }}
                  variant={"destructive"}
                >
                  Hủy đơn hàng
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
          <CardContent>
            <dl className="divide-y divide-gray-100 grid grid-cols-2">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Mã đơn hàng:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.orderNumber}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ngày giờ tạo:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {format(new Date(data?.createdAt), "dd MMM yyyy hh:mm aaaa")}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Trạng thái:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.status}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Tổng tiền đơn hàng:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.totalPrice}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100 grid grid-cols-2">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Tên :
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.customerName}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email :
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.email}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Số điện thoại
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.customerPhone}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Địa chỉ
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data.address}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Ảnh sản phẩm</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tổng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      <img style={{ width: "70px" }} src={item?.image} />
                    </TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>{item?.price}</TableCell>
                    <TableCell>{item?.quantity * item?.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MyOrderDetail;
