import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React,{useEffect, useState} from 'react'



const Edit = () => {
  

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editingItem, setEditingItem] = useState({})
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


 useEffect(() =>{
  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/products/get-all')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.log(error);
    }
  }
  getProducts()
 },[])

 useEffect(() =>{
  const getCategories = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/categories/get-all')
      const data = await res.json()
      data && setCategories(
        data.map((item,index) => {
          return {...item, value:item.title ,key:index} 
          }   
       )  )
    } catch (error) {
      console.log(error);
    }
  }
  getCategories()
 },[])








 const onFinish = async (values) => {
  try {
    fetch('http://localhost:4000/api/products/update-product',{
      method:'PUT',
      body: JSON.stringify({...values,
      productId:editingItem._id}),
      headers: {
        'Content-Type': 'application/json',
        charset: 'UTF-8'

      }
    })
    message.success('Ürün başarıyla güncellendi')
    setProducts(
      products.map((item) =>{
        if (item._id === editingItem._id) {
          return {...item,...values}
        } else {
          return item
          
        }
      })
    )
  } catch (error) {
    message.error('Ürün eklenirken bir hata oluştu')
    console.log(error);
  }
} 

const deleteCategory = async (id) => {
  if (window.confirm('Emin Misiniz?')) {
    try {
      fetch('http://localhost:4000/api/products/delete-product',{
        method:'DELETE',
        body: JSON.stringify({productId:id}),
        headers: {
          'Content-Type': 'application/json',
          charset: 'UTF-8'
        } 
      } )
      message.success('Kategori başarıyla silindi')
      setProducts(products.filter((item) => item._id !== id))
    } catch (error) {
      message.error('Kategori silinirken bir hata oluştu')
      console.log(error); 
    }
  }
}
 



 
  
  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      render:(_,record) => {
        return(
            <p>{record.title}</p>
        )
      }
    },
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      render:(_,record) => {
        return(
            <img className='object-cover rounded-md w-20 h-20' src={record.img} alt={record.title} />
        )
      }
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
    },
    {
      title: 'Katagori',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render:(_,record) => {
        return(
          <div className='flex items-center justify-between'>
            <button onClick={()=>{
              setEditingItem(record)
              showModal()
            }}>Düzenle</button>
            <button onClick={()=> deleteCategory(
              record._id
            )} >Sil</button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
         <div>
         <Table scroll={{x:1000, y:600}}
          pagination={false} dataSource={products} columns={columns} rowKey={"_id"}
         />
          <Modal
        footer={false}
        title="Yeni Ürün Ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
        initialValues={editingItem}
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
            label="Ürün Fiyatı"
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
    </div>
  )
}

export default Edit