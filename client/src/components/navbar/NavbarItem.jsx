import React from "react";
import { Button } from "antd";

const NavbarItem = ({ item, setCategoryTitle, categoryTitle }) => {
  return (
    <div className="flex items-center justify-center" >
      <li onClick={()=> setCategoryTitle(item.title)}  >
        <Button htmlType="submit"
          className= {`bg-orange-500 w-[9rem] h-[3rem] flex items-center justify-center text-white transition-all duration-300 ${categoryTitle === item.title && "bg-purple-700"} `}
          type="primary"
        >
          {" "}
          {item.title}{" "}
        </Button>
      </li>
    </div>
  );
};

export default NavbarItem;
