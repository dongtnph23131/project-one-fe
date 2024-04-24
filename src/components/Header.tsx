import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "./ui/button";
const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")!));
  const navigate = useNavigate();
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
                        <button
                          role="menuitem"
                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          data-orientation="vertical"
                          data-radix-collection-item=""
                        >
                          My order
                        </button>
                        {user?.role === "admin" ? (
                          <Link to={"/admin"}>
                            <button
                              role="menuitem"
                              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                              data-orientation="vertical"
                              data-radix-collection-item=""
                            >
                              Admin
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
                          Logout
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
                <Button>Signin</Button>
              </Link>
              <Link to={"/signup"}>
                <Button>Signup</Button>
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
