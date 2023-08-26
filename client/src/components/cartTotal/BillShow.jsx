import React from "react";
import { Button, Table } from "antd";
import {useReactToPrint} from 'react-to-print';
import {useRef} from 'react'

const BillShow = ({ customer }) => {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const dataSource = customer.cartItems.map((item, index) => ({
    ...customer,
    cartItems: [item],
    key: index,
  }));

  const columns = [
    {
      title: "Görsel",
      dataIndex: "cartItems",
      key: "gorsel",
      render: (cartItems) => (
        <img src={cartItems[0].img} className="w-20 h-20" alt="Görsel" />
      ),
    },
    {
      title: "Başlık",
      dataIndex: "cartItems",
      key: "customerName",
      render: (cartItems) => {
        return <span>{cartItems[0].title}</span>;
      },
    },
    {
      title: "Fiyat",
      dataIndex: "cartItems",
      key: "price",
      render: (cartItems) => <span>{cartItems[0].price.toFixed(2)}</span>,
    },
    {
      title: "Adet",
      dataIndex: "cartItems",
      key: "quantity",
      render: (cartItems) => <span>{cartItems[0].quantity}</span>,
    },
    {
      title: "Toplam",
      render: (text, record) => (
        <span>$ {(record.cartItems[0].quantity * record.cartItems[0].price).toFixed(2)}</span>
      ),
    },
  ];

  return (
    <div className="w-full" ref={componentRef} >
      <div className="w-[5xl] mx-auto border-b pb-2">
        <div className="bg-black h-[4rem]"></div>
        <div>
          <img
            src="/images/logo.png"
            className="w-32 h-32 object-cover"
            alt=""
          />
        </div>
        <div className="grid  md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-y-8 border-y justify-around gap-x-4 p-2">
          <div className="flex flex-col">
            <h1 className="font-bold tracking-wider text-lg">Fatura Detayı</h1>
            <span className="font-bold tracking-widest text-green-500 uppercase"> {customer.customerName} </span>
            <span>Fake Stret 123</span>
            <span>San Javier</span>
            <span>CA 1234</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold tracking-wider text-lg">Fatura</h1>
            <span>The Boring Company</span>
            <span>Tesla Stret 007</span>
            <span>Frisco</span>
            <span>0000</span>
          </div>
          <div>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-wider text-base">
                Fatura Numarası
              </h1>
              <span> {Math.floor(Math.random() * 100)} </span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-wider text-base">
                Veriliş Tarihi
              </h1>
              <span>{customer.createdAt.substring(0, 10)} </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-wider text-base">Terms</h1>
              <span>0 Days</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-wider text-base">Due</h1>
              <span>00.00.00</span>
            </div>
          </div>
        </div>
        <div className="my-10">
          <Table
            scroll={{ x:1000, y:1000 }}
            className="overflow-auto max-h-[20rem]"
            pagination={false}
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.key}
          />
        </div>
        <div className="w-[14rem]  my-5 ml-auto">
          <div className="p-2 border flex flex-col gap-y-4 items-start text-lg rounded-lg">
            <div className="flex items-center justify-between w-full">
              <p>Subtotal</p>
              <span>$
                {customer.subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <p>Tax</p>
              <span className="font-light text-red-500 tracking-wider">
                + {
                  customer.tax.toFixed(2)
                }
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-bold text-green-500 tracking-wider">Total</p>
              <span className="font-bold text-green-500 tracking-wider">
                $ {customer.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
          dolores et eos recusandae. Dolor molestias, magni optio veritatis
          suscipit similique sint saepe ea a officiis amet odio ducimus quas
          fuga.{" "}
        </p>
      </div>
      <div className="bg-black h-[4rem]"></div>
      <div className="mt-3 my-1">
        <Button onClick={handlePrint} className="bg-orange-500 ml-auto py-3 px-11 flex items-center justify-center" type="primary">
          Yazdır
        </Button>
      </div>
    </div>
  );
};

export default BillShow;
