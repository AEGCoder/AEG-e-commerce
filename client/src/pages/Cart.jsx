import { Table, Modal, Button, Input, Space, message } from "antd";
import React, { useState, useRef } from "react";
import CreateBill from "../components/cartTotal/CreateBill";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, deleteProduct } from "../redux/cartSlice";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Header from "../components/header/Header";
import { motion } from "framer-motion";
const Cart = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (text) => {
        return (
          <img
            className="w-14 h-14 rounded-xl object-cover"
            src={text}
            alt=""
          />
        );
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>${text.toFixed(2)}</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-x-5">
            <Button
              onClick={() => dispatch(decrease(record))}
              className="bg-red-500"
              type="primary"
            >
              -
            </Button>
            <span className="font-bold text-xl"> {record.quantity} </span>
            <Button
              onClick={() => dispatch(increase(record))}
              className="bg-green-500"
              type="primary"
            >
              +
            </Button>
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return <span>${(record.quantity * record.price).toFixed(2)}</span>;
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              dispatch(deleteProduct(record));
              message.success("Ürün silindi");
            }}
            type="link"
            danger
          >
            {" "}
            Sil{" "}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-auto max-h-[26rem]">
          <Table
            scroll={{ x: 1000, y: 1000}}
            pagination={false}
            dataSource={cart.cartItems}
            columns={columns}
            rowKey={"_id"}
          />
        </div>

        <div className="flex flex-col justify-evenly md:w-[30rem] w-full md:px-0 px-1 mb-24 h-[15rem] md:pl-5 pl-0">
          <div className="p-2 border rounded-lg flex flex-col gap-y-4 w-full">
            <div className="flex items-center justify-between">
              <h1>Ara Toplam</h1>
              <span>${cart.total > 0 ? cart.total.toFixed(2) : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <h1>KDV %{cart.tax}</h1>
              <span className="text-base font-light text-red-500">
                +$ {((cart.total * cart.tax) / 100).toFixed(2)}{" "}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">Toplam</h1>
              <span className="text-lg font-bold text-green-500">
                $ {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}{" "}
              </span>
            </div>
            <button
              onClick={showModal}
              className="bg-blue-500 text-white w-full py-2 rounded-lg"
            >
              Sipariş Oluştur
            </button>
            <Modal
              footer={false}
              title="Fatura Oluştur"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <CreateBill />
            </Modal>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
