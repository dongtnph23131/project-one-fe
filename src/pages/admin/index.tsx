import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllOrders } from "@/services/order";
import { getAllProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [
      "PRODUCTS_KEY",
      { limit: 5, page: 1, sort: "purchases", order: "desc" },
    ],
    queryFn: getAllProducts,
  });
  const orderDelivered = orders?.filter((order: any) => {
    return order.status === "delivered";
  });
  const revenue = orderDelivered?.reduce((accumulator: any, value: any) => {
    return value.totalPrice + accumulator;
  }, 0);
  if (isError) {
    return <p>Error ...</p>;
  }
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4 px-5 py-5">
      <Link to={"/admin/orders"}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng đơn hàng
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-package-2 h-6 w6 bg-blue-100 text-blue-600 rounded-md p-1 cursor-pointer hover:bg-blue-200 hover:text-blue-700 transition-colors"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
          </CardHeader>

          <CardContent>{orders?.length}</CardContent>
        </Card>
      </Link>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Tổng đơn hàng thành công
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-package-2 h-6 w6 bg-blue-100 text-blue-600 rounded-md p-1 cursor-pointer hover:bg-blue-200 hover:text-blue-700 transition-colors"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
        </CardHeader>

        <CardContent>{orderDelivered?.length}</CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Doanh thu
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-package-2 h-6 w6 bg-blue-100 text-blue-600 rounded-md p-1 cursor-pointer hover:bg-blue-200 hover:text-blue-700 transition-colors"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
        </CardHeader>

        <CardContent>{revenue}</CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Danh sách sản phẩm bán chạy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {products?.map((product) => (
              <div key={product._id} className="flex items-center">
                <Avatar className="h-10 w-10 rounded-sm border border-gray-200">
                  <AvatarImage
                    src={
                      product.image ??
                      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                    }
                    alt="Avatar"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {product.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lượt mua hàng: {product.purchases}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
