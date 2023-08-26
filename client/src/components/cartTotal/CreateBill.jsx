import React from "react";
import { Form, Input, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {reset} from "../../redux/cartSlice"
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:4000/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: {
          "Content-type": "application/json",
          charset: "UTF-8",
        },
      });
      console.log(res);
      if (res.status === 201) {
        message.success("Sipariş Başarıyla Oluşturuldu");
        dispatch(reset())
        navigate("/bills");
      }
    } catch (error) {
      message.error("Sipariş Oluşturulamadı");
      console.log(error);
    }
  };



  return (
    <div>
      <div>
        <Form
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[
              {
                required: true,
                message: "Müşteri Adı Girilmesi Zorunludur!",
              },
            ]}
          >
            <Input placeholder="Müşteri Adı Giriniz..." />
          </Form.Item>

          <Form.Item
            label="Telefon Numarası"
            name={"customerPhoneNumber"}
            rules={[
              {
                required: true,
                message: "Telefon Numarası Girilmesi Zorunludur!",
              },
            ]}
          >
            <Input placeholder="Telefon Numarası Giriniz..." />
          </Form.Item>

          <Form.Item
            name={"paymentMode"}
            label="Ödeme Yöntemi"
            rules={[
              {
                required: true,
                message: "Ödeme Yöntemi Girilmesi Zorunludur!",
              },
            ]}
          >
            <Select placeholder="Ödeme Yöntemi Seçiniz...">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <div>
            <div className="border p-3 flex flex-col gap-y-3">
              <div className="flex items-center justify-between text-lg border-b pb-2">
                <span>Ara Toplam</span>
                <span>$ {(cart.total).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-lg border-b pb-2">
                <span>KDV Toplam % {cart.tax} </span>
                <span className="font-medium text-red-500">
                  $ {((cart.total * cart.tax) / 100).toFixed(2)}{" "}
                </span>
              </div>
              <div className="flex items-center justify-between text-xl">
                <span className="font-bold tracking-wide">Toplam</span>
                <span className="font-bold text-green-500">
                  $ {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}{" "}
                </span>
              </div>
              <button
                type="submit"
               disabled={cart.cartItems.length === 0}
                className="bg-blue-500 text-white py-2 w-full rounded-lg"
              >
                Sipariş Oluştur
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateBill;
