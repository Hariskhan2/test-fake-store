'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Table, Button, InputNumber, Space, Typography } from 'antd';

import { useAppSelector, useAppDispatch } from '@/store/hooks';

import { removeFromCart, updateQuantity, clearCart } from '@/store/reducers/cartSlice';

const { Title, Text } = Typography

const CartPage = () => {
  const { items: cartItems } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const mobileColumns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Image 
              src={record.image} 
              alt={text} 
              className="w-12 h-12 object-contain mr-2"
            />
            <span className="text-sm">{text}</span>
          </div>
          <div className="flex justify-between items-center">
            <Text strong>${(record.price * record.quantity).toFixed(2)}</Text>
            <InputNumber
              size="small"
              min={1}
              max={10}
              defaultValue={record.quantity}
              onChange={(value) => {
                if (value !== null) {
                  dispatch(updateQuantity({ id: record.id, quantity: value }))
                }
              }}
            />
            <Button 
              danger 
              size="small"
              onClick={() => dispatch(removeFromCart(record.id))}
            >
              Remove
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const desktopColumns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Image
            src={record.image} 
            alt={text} 
            className="w-16 h-16 object-contain mr-4"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          max={10}
          defaultValue={quantity}
          onChange={(value) => {
            if (value !== null) {
              dispatch(updateQuantity({ id: record.id, quantity: value }))
            }
          }}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (text: string, record: any) => (
        <Text strong>${(record.price * record.quantity).toFixed(2)}</Text>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Button 
          danger 
          onClick={() => dispatch(removeFromCart(record.id))}
        >
          Remove
        </Button>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 my-8 rounded-lg border-[#D9D9D9] border-2">
      <Title level={2} className="!text-xl sm:!text-2xl">Your Cart ({totalItems} items)</Title>
      
      {cartItems.length > 0 ? (
        <>
          <div className="hidden sm:block">
            <Table 
              columns={desktopColumns} 
              dataSource={cartItems} 
              rowKey="id"
              pagination={false}
              className="mb-8"
            />
          </div>
          
          <div className="sm:hidden">
            {cartItems.map(item => (
              <div key={item.id} className="mb-4 p-4 border-b">
                <Table 
                  columns={mobileColumns} 
                  dataSource={[item]} 
                  rowKey="id"
                  pagination={false}
                  showHeader={false}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center px-0 sm:px-8 gap-4">
            <Button 
              danger 
              onClick={() => dispatch(clearCart())}
              className="w-full sm:w-auto"
            >
              Clear Cart
            </Button>
            
            <div className="text-center sm:text-right w-full sm:w-auto">
              <Title level={4} className="!my-2">Total: ${totalPrice.toFixed(2)}</Title>
              <Link href="/checkout" className="block">
                <Button className='!bg-[#0a96d4] !text-white border-none hover:!bg-[#087bb3] w-full sm:w-auto'>Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Space direction="vertical" align="center" className="w-full py-16">
          <Title level={3}>Your cart is empty</Title>
          <Link href="/">
            <Button className='!bg-[#0a96d4] !text-white border-none hover:!bg-[#087bb3]'>Continue Shopping</Button>
          </Link>
        </Space>
      )}
    </div>
  )
}

export default CartPage