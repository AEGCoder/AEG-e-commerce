import React, { useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Table, Input, message } from 'antd';

const Edit = ({categories, setCategories}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState({});
  const onFinish =  (values) => {
     try {
        fetch('http://localhost:4000/api/categories/update-category',{
          method:'PUT',
          body:JSON.stringify({...values,categoryId:editingRow._id}),
          headers:{
            'Content-Type':'application/json',
            charset:'UTF-8'
            
          }
       })
       
       message.success('Kategori Başarıyla Güncellendi')
       setCategories(categories.map((item)=>{
          if (item._id === editingRow._id) {
            return{
              ...item,
              title:values.title
            }
          } else {
            return item
          }
       })) 
     }   catch (error) {
      message.error('Kategori Güncellenirken Bir Hata Oluştu')
      console.log(error);
     }
  }
  const deleteCategory =  (id) => {
    try {
      if (window.confirm('Emin misiniz?')) {
        fetch('http://localhost:4000/api/categories/delete-category',{
          method:'DELETE',
          body:JSON.stringify({categoryId: id}),
          headers:{
            'Content-Type':'application/json',
            charset:'UTF-8'
          }
       })
        message.success('Kategori Başarıyla Silindi')
        setCategories(categories.filter((item)=>item._id !== id))
      }
    } catch (error) {
      message.error('Kategori Silinirken Bir Hata Oluştu')
      console.log(error);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'Kategori Adı',
      dataIndex: 'title',
      render:(_,record) =>{
         if (record._id === editingRow._id) {
           return(
            <Form.Item name="title" >
              <Input />
            </Form.Item>
           )
          
         } else {
          return(
            <span className='font-bold tracking-wider'>{record.title}</span>
          )
         }
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render:(text,record) =>{
        return(
          <div className='flex items-center gap-x-2'>
                     <Button onClick={()=>setEditingRow(record)} type='link'>Düzenle</Button> 
                     <Button htmlType='submit'  type='text '>Kaydet</Button> 
                     <Button onClick={()=>deleteCategory(record._id)} danger type='text'>Sil</Button> 
          </div>
        ) 
      }
    }

  ]
  

  return (
    <div>
      <Button
        className="bg-red-500 w-[9rem] h-[3rem]  flex items-center justify-center text-white transition-all duration-300"
        onClick={showModal}
      >
        <EditOutlined />
      </Button>
      <Modal
       width={800}
      footer={false}
        title="Kategori Düzenle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name='title' onFinish={onFinish}
           initialValues={{
            remember: true,}}
          autoComplete="off"
        >
          <Table className='p-0' pagination={false} scroll={{
            y:1000,
            x:300
          }}  dataSource={categories} columns={columns} rowKey={"_id"} >
          </Table>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
