import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCartByUser } from "@/services/cart";
import { Input } from "./ui/input";
import axios from "axios";
import db_URI from "@/configs/db";
const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")!));
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["cart", user?._id],
    queryFn: getCartByUser,
  });
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="header__logo">
            <img src={Logo} alt="#" />
          </Link>
          <div className="button-mobile">
            <button>=</button>
          </div>
          <nav className="main-menu">
            <ul className="main-menu__list">
              <li className="main-menu__item">
                <NavLink to="/" className="main-menu__link">
                  Home
                </NavLink>
              </li>
              <li className="main-menu__item">
                <NavLink to="/shop" className="main-menu__link">
                  Shop
                </NavLink>
              </li>
              <li className="main-menu__item">
                <NavLink to="/about" className="main-menu__link">
                  About
                </NavLink>
              </li>
              <li className="main-menu__item">
                <NavLink to="/contact" className="main-menu__link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <Dialog>
            <DialogTrigger>
              <div
                onClick={() => {
                  setIsSearch(true);
                  setDataSearch([]);
                }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 xl:mr-2"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="xl:inline-flex">Tìm kiếm sản phẩm ...</span>
              </div>
            </DialogTrigger>
            {isSearch ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                    <Input
                      className="mt-5"
                      placeholder="Tìm kiếm sản phẩm theo tên"
                      onChange={async (e: any) => {
                        try {
                          if (e.target.value === "") {
                            setDataSearch([]);
                            return;
                          }
                          const querySearch =
                            e.target.value !== "" ? `_q=${e.target.value}` : "";
                          const response = await axios.get(
                            `${db_URI()}/products?${querySearch}`
                          );
                          setDataSearch(response?.data?.data);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    />
                    {dataSearch?.length > 0 ? (
                      <>
                        {dataSearch?.map((item: any, index: any) => {
                          return (
                            <span
                              key={index + 1}
                              onClick={() => {
                                setDataSearch([]);
                                setIsSearch(false);
                                navigate(`/products/${item?._id}`);
                              }}
                            >
                              <span className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50 h-9 hover:bg-slate-100 mt-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2.5 size-3 text-muted-foreground"
                                  aria-hidden="true"
                                >
                                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                  <path d="M3 6h18"></path>
                                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                <span className="truncate">{item?.name}</span>
                              </span>
                            </span>
                          );
                        })}
                      </>
                    ) : (
                      ""
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            ) : (
              ""
            )}
          </Dialog>
          {user ? (
            <div className="header-items">
              <Link to={"/cart"}>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground size-9 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  <span className="absolute top-0 right-1">
                    {data?.products?.length}
                  </span>
                </button>
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className=" w-[300px] p-4 mr-[20px]">
                        <Link to={"/orders/user"}>
                          <button
                            role="menuitem"
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            data-orientation="vertical"
                            data-radix-collection-item=""
                          >
                            Đơn hàng của tôi
                          </button>
                        </Link>
                        {user?.role === "admin" ? (
                          <Link to={"/admin"}>
                            <button
                              role="menuitem"
                              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                              data-orientation="vertical"
                              data-radix-collection-item=""
                            >
                              Quản trị
                            </button>
                          </Link>
                        ) : (
                          ""
                        )}
                        <button
                          role="menuitem"
                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          data-orientation="vertical"
                          data-radix-collection-item=""
                          onClick={() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("tokeb");
                            setUser("");
                            navigate("/");
                          }}
                        >
                          Đăng xuất
                        </button>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          ) : (
            ""
          )}
          {!user ? (
            <div className="flex gap-3 justify-center">
              <Link to={"/signin"}>
                <Button>Đăng nhập</Button>
              </Link>
              <Link to={"/signup"}>
                <Button>Đăng ký</Button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
