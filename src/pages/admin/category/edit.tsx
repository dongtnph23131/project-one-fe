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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editCategory, getCategoryById } from "@/services/category";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const formSchema = z.object({
  name: z.string().min(6, {
    message: "Cần nhập tên danh mục sản phẩm trên 6 kí tự",
  }),
});
const CategoryEdit = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["CATEGORIES", id],
    queryFn: async () => {
      return await getCategoryById(id as any);
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    form.setValue("name", data?.category?.name);
  }, [data]);
  const mutation = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      form.reset();
      toast({
        title: "Cập nhập danh mục sản phẩm thành công",
      });
      navigate("/admin/categories");
    },
    onError: () => {
        toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
      },
  });
  function submitForm(category: any) {
    mutation.mutate({ ...category, _id: id });
  }
  return (
    <div className="py-5 px-5">
      <div className="flex justify-between p-5">
        <h1 className="text-2xl">Cập nhập danh mục sản phẩm</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên danh mục sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên danh mục sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>
            {mutation.isPending ? "Loding..." : "Thêm mới danh mục sản phẩm"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryEdit;
