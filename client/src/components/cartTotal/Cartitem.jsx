import React from 'react'
import {Button, message} from 'antd'
import { useDispatch } from 'react-redux'
import {deleteProduct, increase, decrease} from '../../redux/cartSlice'
const Cartitem = ({item}) => {
    const dispatch = useDispatch()
  return (
    <div className='flex items-center justify-center w-full'>
         <li className='flex justify-around items-center w-full gap-x-4 border-b pb-2 my-5'>
                         <div>
                            <img onClick={()=>{
                                dispatch(deleteProduct(item))
                                message.success('Ürün Sepetten Silindi')
                            } } src={item.img} alt="" className='w-20 h-20 object-cover p-1' />
                         </div>
                         <div className='flex flex-col items-center pr-2'>
                            <h1 className='text-2xl md:text-xl font-semibold tracking-widest pl-20'>{item.title} </h1>
                            <div className='flex items-center justify-around mt-4 gap-x-10'> 
                            <span className='text-2xl md:text-lg font-bold text-red-500'>$ {item.price} </span>
                            <div className='flex items-center gap-x-5'>
                            <Button onClick={() => dispatch(decrease(item))}  className='bg-red-500' type="primary">-</Button>
                                <span className='font-bold text-2xl md:text-lg'> {item.quantity} </span>
                                <Button onClick={() => dispatch(increase(item))} className='bg-green-500' type="primary">+</Button>
                            </div>
                            </div>
                         </div>
                    </li>
    </div>
  )
}

export default Cartitem