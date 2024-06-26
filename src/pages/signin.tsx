import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Logo } from "./../components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/services/auth";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const formSchema = z.object({
  email: z.string().email({
    message: "Sai địng dạng email",
  }),
  password: z.string().min(6, {
    message: "Cần nhập mật khẩu trên 6 kí tự",
  }),
});
const SigninPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      if (data?.user) {
        form.reset();
        toast({
          title: "Đăng nhập tài khoản thành công",
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: data?.messages[0],
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error! An error occurred. Please try again later !",
      });
    },
  });
  const submitForm = (user: any) => {
    mutation.mutate(user);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đăng nhập tài khoản
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>
              {mutation.isPending ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Đăng nhập tài khoản"
              )}
            </Button>
            <Link className="mx-5" to={"/signup"}>
              <Button>Đăng ký</Button>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;
