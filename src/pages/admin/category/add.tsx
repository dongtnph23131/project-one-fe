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
import { useMutation } from "@tanstack/react-query";
import { addCategory } from "@/services/category";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  name: z.string().min(6, {
    message: "Cần nhập tên danh mục sản phẩm trên 6 kí tự",
  }),
});
const CategoryAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      form.reset();
      toast({
        title: "Thêm danh mục sản phẩm thành công",
      });
      navigate("/admin/categories");
    },
    onError: () => {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    },
  });
  function submitForm(category: any) {
    mutation.mutate(category);
  }
  return (
    <div className="py-5 px-5">
      <div className="flex justify-between p-5">
        <h1 className="text-2xl">Thêm mới danh mục sản phẩm</h1>
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

export default CategoryAdd;
