import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Products from "../components/products/Products";
import CartComponents from "../components/cartTotal/CartTotal";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CarouselComponent from "../components/Carousel/Carousel";
import { motion } from "framer-motion";
import { Spin, Carousel } from "antd";

const Home = () => {
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item, index) => {
              return { ...item, value: item.title, key: index };
            })
          );
      } catch (error) {
        console.error(error.message);
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <Header setSearch={setSearch} />
      <motion.div
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 30 }}
        transition={{ duration: 0.2 }}
      >
        <CarouselComponent />
        {/* en çok tercih edilen ürünler  start*/}
        <div className="  my-5">
          <h1 className="text-center font-bold md:text-4xl text-2xl mb-3 md:tracking-widest tracking-tight">
            Yılın En Çok Satan Ürünleri
          </h1>
          <div className="grid grid-cols-3 gap-x-3 px-1 items-center  md:gap-y-0 gap-y-10 h-[11rem] mb-12">
            <div className="flex flex-col gap-y-4 items-center border  border-dashed p-3 border-orange-400 rounded-xl bg-gradient-to-br from-green-100 to-transparent">
              <div className="bg-gradient-to-tl from-purple-200  to-transparent hover:bg-gradient-to-br hover:from purple-200 transition-all duration-300 rounded-full">
                <img
                  src="/images/watchBest.svg"
                  className="md:w-48 md:h-48 sm:w-36 sm:h-36 w-20 h-20 object-contain rounded-full"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 items-center border  border-dashed p-3 border-orange-400 rounded-xl bg-gradient-to-br from-red-100 to-transparent">
              <div className="bg-gradient-to-tl from-purple-200 to-transparent hover:bg-gradient-to-br hover:from purple-200 transition-all duration-300 rounded-full">
                <img
                  src="/images/pan.svg"
                  className="md:w-48 md:h-48 sm:w-36 sm:h-36 w-20 h-20 object-contain rounded-full"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 items-center border  border-dashed p-3 border-orange-400 rounded-xl bg-gradient-to-br from-cyan-100 to-transparent">
              <div className="bg-gradient-to-tl from-purple-200 to-transparent hover:bg-gradient-to-br hover:from purple-200 transition-all duration-300 rounded-full">
                <img
                  src="/images/kulaklık.svg"
                  className="md:w-48 md:h-48 sm:w-36 sm:h-36 w-20 h-20 object-contain rounded-full"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* en çok tercih edilen ürünler end */}
      </motion.div>

      {products && categories ? (
        <>
          <Navbar
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 30 }}
            transition={{ duration: 0.3 }}
            className="flex lg:flex-row flex-col w-full justify-between lg:px-1 sm:px-1 px-0"
          >
            <div className="xl:w-[76%] lg:w-[72%] w-full">
              <Products
                filtered={filtered}
                categories={categories}
                setCategories={setCategories}
                search={search}
              />
            </div>
            <div className="xl:w-[24%] lg:w-[28%] w-full sm:mb-0">
              <CartComponents />
            </div>
          </motion.div>
        </>
      ) : (
        <Spin
          size="large"
          className="absolute w-screen h-screen flex top-1/2 justify-center"
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
