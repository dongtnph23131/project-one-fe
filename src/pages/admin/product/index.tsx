import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/interfaces/product";
import { getAllProducts, removeProductById } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { getAllCategories } from "@/services/category";
import { Input } from "@/components/ui/input";
const ProductManagement = () => {
  const [category, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sort, setSort] = useState("asc");
  const [order, setOrder] = useState("createdAt");
  const [q, setQ] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES_KEY"],
    queryFn: getAllCategories,
  });
  const { data: products } = useQuery({
    queryKey: ["PRODUCTS_KEY", { page, limit, sort, order, category,q }],
    queryFn: getAllProducts,
  });
  const mutation = useMutation({
    mutationFn: removeProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS_KEY", { page, limit, sort, order, category,q }],
      });
      toast({
        title: "Xóa sản phẩm thành công",
      });
    },
  });
  useEffect(() => {
    (async () => {
      const queryCategory = category ? `?&_category=${category}` : "";
      const response = await axios.get(
        `https://project-one-be.onrender.com/api/v1/products${queryCategory}`
      );
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
  return (
    <div className="px-5 py-5">
      <div className="flex justify-between">
        <h1 className="text-2xl">Danh sách sản phẩm</h1>
        <Link to={"/admin/products/add"}>
          <Button>Thêm sản phẩm</Button>
        </Link>
      </div>
      <div className="px-5 py-5 flex gap-3">
        <Select
          onValueChange={(value: any) => {
            const values = value.split(" ");
            setSort(values[0]);
            setOrder(values[1]);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Lọc sản phẩm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt desc">Sản phẩm mới nhất</SelectItem>
            <SelectItem value="createdAt asc">Sản phẩm cũ nhất</SelectItem>
            <SelectItem value="priceSelling asc">Giá tăng dần</SelectItem>
            <SelectItem value="priceSelling desc">Giá giảm dần</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: any) => {
            setCategory(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[450px]">
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
        <Input
          placeholder="Tìm kiếm sản phẩm theo tên"
          value={q}
          onChange={(e: any) => {
            setQ(e.target.value);
          }}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Giá sản phẩm</TableHead>
            <TableHead>Ảnh sản phẩm</TableHead>
            <TableHead>Số lượng tồn kho sản phẩm</TableHead>
            <TableHead>Phần trăm giảm sản phẩm</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: IProduct, index: number) => {
            return (
              <TableRow key={index + 1}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.priceSelling}</TableCell>
                <TableCell>
                  <img style={{ width: "70px" }} src={product?.image} />
                </TableCell>
                <TableCell>{product?.countInStock}</TableCell>
                <TableCell>{product?.discount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      const confirm = window.confirm(
                        "Bạn có chắc chắn muốn xóa sản phẩm này không ?"
                      );
                      if (confirm) {
                        mutation.mutate(product._id);
                        setPage(1);
                      }
                    }}
                  >
                    Delete
                  </Button>
                  <Link to={`/admin/products/${product?._id}/edit`}>
                    <Button className="ml-2">Edit</Button>
                  </Link>
                </TableCell>
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

export default ProductManagement;
