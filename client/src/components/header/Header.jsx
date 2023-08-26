import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input, Badge, message  } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
const Header = ({setSearch}) => {
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate();
  const {pathname} = useLocation();


  const logOut = () => {
    if (window.confirm("Çıkış Yapmak İstediğinize Emin Misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış Yapıldı");
    }
  }

  return (
    <header className="w-full ">
      <div className="flex items-center justify-between w-full p-2">
        <div className="">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="md:w-[50%] ml-3 w-full pl-3">
          <Input
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="w-full"
            size="large"
            placeholder="large size"
            prefix={<UserOutlined />}
            onClick={() => {
               pathname !== "/" && navigate("/")
            }}
          />
        </div>
        <div className="md:static fixed bottom-0 left-0 w-full md:bg-transparent bg-purple-800 md:text-black text-white z-50">
          <ul className="flex items-center md:font-medium font-bold tracking-wide  lg:gap-x-5 sm:gap-x-3 gap-x-0 lg:p-1 p-0 md:justify-end justify-around lg:text-lg md:text-sm text-xs md:w-auto w-screen">
            <li className="hover:text-orange-500   transition-all duration-300 md:w-[5rem] md:h-[3.5rem] sm:w-[5rem] sm:h-[3.5] rounded-md w-[4rem] h-[3.5rem] flex items-center justify-center">
              <Link className={`flex flex-col items-center  ${
                pathname === "/" && "text-blue-500"
              }`} to="/">
                <span>
                  {" "}
                  <HomeOutlined />{" "}
                </span>
                <span>Anasayfa</span>
              </Link>
            </li>
            <li className="hover:text-orange-500 transition-all duration-300 md:w-[5rem] md:h-[3.5rem] sm:w-[5rem] sm:h-[3.5] w-[4rem] h-[3.5rem] rounded-md flex items-center justify-center">
               <Badge count={
                  cart.cartItems.length
               }  offset={[1, 10]}
               >
              <Link className={`bad flex hover:text-orange-500 flex-col items-center lg:text-lg  md:text-[15px] text-sm md:text-black text-white ${
                pathname === "/cart" && "active"
              }`} to={"/cart"}>
                <span>
                  {" "}
                  <ShoppingCartOutlined />{" "}
                </span>
                <span >Sepet</span>
              </Link>
              </Badge>
            </li>
            <li className="hover:text-orange-500  transition-all duration-300 md:w-[5rem] md:h-[3.5rem] sm:w-[5rem] sm:h-[3.5] w-[4rem] h-[3.5rem]  rounded-md flex items-center justify-center">
              <Link className={`flex flex-col items-center  ${
                pathname === "/bills" && "text-blue-500"
              }`}  to="/bills">
                <span>
                  {" "}
                  <CopyOutlined />{" "}
                </span>
                <span>Fatura</span>
              </Link>
            </li>
            <li className="hover:text-orange-500  transition-all duration-300 md:w-[5rem] md:h-[3.5rem] sm:w-[5rem] sm:h-[3.5] rounded-md w-[4rem] h-[3.5rem] flex items-center justify-center">
              <Link className={`flex flex-col items-center  ${
                pathname === "/customers" && "text-blue-500"
              }`} to="/customers">
                <span>
                  {" "}
                  <UserOutlined />{" "}
                </span>
                <span>Müşteri</span>
              </Link>
            </li>
            <li className="hover:text-orange-500  transition-all duration-300 md:w-[5rem] md:h-[3.5rem] sm:w-[5rem] sm:h-[3.5] rounded-md w-[4rem] h-[3.5rem] flex items-center justify-center">
              <div onClick={logOut} className="flex flex-col items-center cursor-pointer" to="/">
                <span>
                  {" "}
                  <FullscreenExitOutlined />{" "}
                </span>
                <span >Exit</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
