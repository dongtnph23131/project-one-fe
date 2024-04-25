import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/category";
import { getProduct, updateProduct } from "@/services/product";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
const formSchema = z.object({
  name: z.string().min(6, {
    message: "Cần nhập tên danh mục sản phẩm trên 6 kí tự",
  }),
  price: z.string(),
  image: z.string(),
  discount: z.string(),
  countInStock: z.string(),
  featured: z.boolean(),
  description: z.string(),
  category: z.string({
    required_error: "Cần Chọn danh mục sản phẩm.",
  }),
});
const ProductEdit = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      return await getProduct(id as any);
    },
  });
  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES_KEY"],
    queryFn: getAllCategories,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      image: "",
      discount: "",
      countInStock: "",
      featured: false,
      category: "",
      description: "",
    },
  });
  useEffect(() => {
    if(data){
      form.setValue("name", data?.name);
      form.setValue("price", String(data?.price));
      form.setValue("image", data?.image);
      form.setValue("discount", String(data?.discount));
      form.setValue("countInStock", String(data?.countInStock));
      form.setValue("featured", data?.featured);
      form.setValue("description", data?.description);
      form.setValue("category", data?.category?._id);
    }
  }, [data]);
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      form.reset();
      toast({
        title: "Cập nhập sản phẩm thành công",
      });
      navigate("/admin/products");
    },
    onError: () => {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    },
  });
  function submitForm(product: any) {
    const data = {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      countInStock: Number(product.countInStock),
      _id: id,
    };
    mutation.mutate(data);
  }
  return (
    <div className="py-5 px-5">
      <div className="flex justify-between p-5">
        <h1 className="text-2xl">Cập nhập mới sản phẩm</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá sản phẩm</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    placeholder="Nhập giá sản phẩm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập ảnh sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm giá (%)</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    placeholder="Nhập % giảm giá"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countInStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng sản phẩm </FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    placeholder="Nhập số lượng sản phẩm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Sản phẩm nổi bật</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả sản phẩm</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả sản phẩm"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục sản phẩm</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={data?.category?.name} />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>
            {mutation.isPending ? "Loading..." : "Cập nhập sản phẩm"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductEdit;
