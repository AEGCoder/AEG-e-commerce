import React, { useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, message } from "antd";

const Add = ({categories, products, setProducts}) => {
    const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    try {
        fetch('http://localhost:4000/api/products/add-product',{
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
                charset: 'UTF-8'
            }
        })
        message.success('Ürün başarıyla eklendi')
        form.resetFields();
        setProducts([...products, {
            ...values,
            _id: Math.random(),
            price: Number(values.price),
        }]) 
        setIsModalOpen(false);
    } 
     catch (error) {
        message.error('Ürün eklenirken bir hata oluştu')

    }
  };

  return (
    <div className="w-full h-full">
      <Button
        onClick={showModal}
        className="bg-purple-500  w-full h-full flex items-center justify-center"
        htmlType="submit"
        type="primary"
      >
        <PlusSquareOutlined className="text-[5rem] group-hover:animate-bounce transition-all duration-300 ease-in-out" />
      </Button>
      <Modal
        footer={false}
        title="Yeni Ürün Ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
            form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          name="add-product"
        >
          <Form.Item
            label="Ürün Adı"
            name="title"
            rules={[
              {
                required: true,
                message: "Lütfen ürün adını giriniz",
              },
            ]}
          >
            <Input placeholder="Ürün adını giriniz..." />
          </Form.Item>

          <Form.Item
            label="Ürün Görseli"
            name="img"
            rules={[
              {
                required: true,
                message: "Lütfen ürün görselini ekleyiniz",
              },
            ]}
          >
            <Input placeholder="Ürün görseli ekleyiniz..." />
          </Form.Item>

          <Form.Item
            label="Ürün Fiyatı"
            name="price"
            rules={[
              {
                required: true,
                message: "Lütfen ürün fiyatını ekleyiniz",
              },
            ]}
          >
            <Input placeholder="Ürün fiyatını giriniz..." />
          </Form.Item>

          <Form.Item
            label="Kategori"
            name="category"
            rules={[
              {
                required: true,
                message: "Lütfen ürün kategorisi ekleyiniz",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>

    
          <Form.Item>
            <Button
              className="bg-orange-500 px-10"
              htmlType="submit"
              type="primary"
            >
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
