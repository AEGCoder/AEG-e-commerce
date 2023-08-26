import { Button, message } from 'antd'
import React from 'react'
import Cartitem from './Cartitem'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {reset} from '../../redux/cartSlice'
const CartComponents = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
  return (
    <div className='sm:mb-0 mb-10'>
        <div className='p-2  sm:shadow-lg sm:shadow-orange-500 shadow-none w-full'>
            <h1 className='text-xl text-center bg-orange-500 text-white p-1 rounded-md'>Sepetteki Ürünler</h1>
            <div className='my-5 w-full'>
                <ul className='flex flex-col overflow-auto max-h-[35rem]'>
                    {
                       cart.cartItems.length > 0  ?  cart.cartItems.map((item,) => {
                        return <Cartitem key={item._id} item={item}/>
                    } ) : <h1 className='text-center text-xl'>Sepetinizde Ürün Bulunmamaktadır</h1>
                    }
                </ul>
                <div className='border-b pb-2 flex flex-col gap-y-3 p-2 text-lg items-center justify-between'>
                    <div className='flex items-center justify-between w-full px-2'>
                        <h2>Ara Toplam</h2>
                        <span>$
                            {
                                (cart.total).toFixed(2)
                            }
                        </span>
                    </div>
                    <div className='flex items-center justify-between w-full px-2'>
                            <span>KDV% {cart.tax} </span>
                            <span className='text-red-500'>+${
                                (cart.total * cart.tax / 100).toFixed(2)
                            }
                            </span>
                    </div>
                </div>
                <div className='flex items-center justify-between mt-4 w-full px-2 border-b pb-2'>
                    <h1 className='text-lg font-bold text-green-500'>Genel Toplam</h1>
                    <span className='text-xl font-bold tracking-wide'>$ {
                        (cart.total + (cart.total * cart.tax )/ 100).toFixed(2)
                    }
                    </span>
                </div>
                <div className='flex flex-col gap-y-4 mt-7'>
                <Link className='w-full'  to="/cart"> <Button disabled={
                    cart.cartItems.length === 0 ? true : false
                } type='primary' className='bg-green-500 w-full text-white py-5 rounded-md hover:bg-purple-500 transition-all duration-300 flex items-center justify-center'>Şiparis oluştur</Button>  </Link>
                <Button disabled={
                    cart.cartItems.length === 0 ? true : false
                } onClick={()=> {
                    if (window.confirm('Sepetinizi temizlemek istediğinize emin misiniz?')) {
                        dispatch(reset())
                        message.success('Sepetiniz Temizlendi')
                    }
                }} className='bg-red-500 text-white py-5 flex items-center justify-center' type="primary">Temizle</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartComponents