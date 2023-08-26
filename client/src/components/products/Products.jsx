import React from "react";
import ProducsItem from "./ProducsItem";
import Add from "./Add";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
const Products = ({ categories, setCategories, filtered, products, setProducts, search }) => {

  const navigate = useNavigate();

  const container = {
    hidden:{
      opacity: 0,
      scale: 0.5
    },
    visible:{
      opacity: 1,
      scale: 1,
      transition:{
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
    }
  

  const itemMotion = {
    hidden:{
      opacity: 0,
      translateY: 20
    },
    visible:{
      opacity: 1,
      translateY: 0
    }
  }

  return (
    <motion.div initial="hidden" animate="visible"  variants={container} >
    <motion.div  variants={itemMotion}  className=" w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center lg:gap-x-6 sm:gap-x-5 gap-y-9 sm:px-3 px-1 my-10">
      {filtered.filter((product) => product.title.toLowerCase().includes(search)).map((item) => (
        <ProducsItem  key={item._id} item={item} />
      ))}
        <div className="w-[20rem] h-[25rem] bg-yellow-400 group transition-all duration-300">
          <Add
            categories={categories}
            products={products}
            setProducts={setProducts}
          />
        </div>

        <div onClick={() => navigate("/products")} className="w-[20rem] h-[25rem] group transition-all duration-300">
          <Button
            className="bg-green-500 w-full h-full flex items-center justify-center"
            htmlType="submit"
            type="primary"
          >
            <EditOutlined className="text-[5rem] group-hover:animate-bounce transition-all duration-300 ease-in-out" />
          </Button>
        </div>
    </motion.div>
    </motion.div>
  );
};

export default Products;
