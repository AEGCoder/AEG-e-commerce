import React, { useState, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import Edit from "./Edit";
const Navbar = (props) => {
   
  

  const { categories, setCategories, setFiltered, products } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [categoryTitle, setCategoryTitle] = useState("Tümü");



  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
   
  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  },[products,setFiltered,categoryTitle]);
 



  const onFinish = (values) => {
    try {
      fetch("http://localhost:4000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
      });
    } catch (error) {
      console.log(error);
    }
    form.resetFields();
    setCategories([
      ...categories,
      {
        _id: Math.random(),
        title: values.title,
      },
    ]);
  };

  return (
    <nav className="w-full my-4 flex items-center justify-center">
      <div className="w-full flex items-center justify-center p-2">
        <ul className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-y-2 w-full">
          {categories.map((item) => (
            <NavbarItem  setCategoryTitle={setCategoryTitle} categoryTitle={categoryTitle} key={item._id} item={item} />
          ))}
          {/* add new category */}
          <li className="flex items-center justify-center " onClick={showModal}>
            <Button className="bg-blue-500 w-[9rem] h-[3rem]  flex items-center justify-center text-white transition-all duration-300">
              {" "}
              <PlusCircleOutlined />{" "}
            </Button>
          </li>
          <li className="flex items-center justify-center">
            <Edit categories={categories} setCategories={setCategories} />
          </li>
          <Modal
            footer={false}
            title="Kategori Ekle"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Kategori Ekle"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Lütfen bir kategori adı giriniz",
                  },
                ]}
              >
                <Input placeholder="Bir kategori adı giriniz" />
              </Form.Item>
              <button className="bg-orange-500 text-white hover:bg-green-500 transition-all duration-300 w-full py-2 rounded-xl">
                Oluştur
              </button>
            </Form>
          </Modal>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
