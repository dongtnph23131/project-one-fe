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
import { ICategory } from "@/interfaces/category";
import { getAllCategories, removeCategory } from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const { toast } = useToast();
  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES_KEY"],
    queryFn: getAllCategories,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CATEGORIES_KEY"] });
      toast({
        title: "Xóa danh mục sản phẩm thành công",
      });
    },
  });
  return (
    <div className="px-5 py-5">
      <div className="flex justify-between">
        <h1 className="text-2xl">Danh mục sản phẩm</h1>
        <Link to={"/admin/categories/add"}>
          <Button>Thêm danh mục sản phẩm</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Tên danh mục sản phẩm</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category: ICategory, index: number) => {
            return (
              <TableRow key={index + 1}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{category?.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      const confirm = window.confirm(
                        "Bạn có chắc chắn muốn xóa danh mục sản phẩm này không ?"
                      );
                      if (confirm) {
                        mutation.mutate(category._id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                  <Link to={`/admin/categories/${category?._id}/edit`}>
                    <Button className="ml-2">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryList;
