'use client'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hooks'
import { Button, Typography, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

import { clearCart } from '@/store/reducers/cartSlice'

const { Text } = Typography

export default function CheckoutSuccessPage() {
  // const { items: cartItems, totalPrice } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  return (
    <div className="container mx-auto px-4 py-8">
      <Result
        icon={<SmileOutlined style={{ color: '#0a96d4' }} />}
        status="success"
        title="Order Placed Successfully!"
        subTitle="7Ybhf9I5G"
        extra={[
          <Link href="/" key="continue">
            <Button 
              type="primary" 
              className="!bg-[#0a96d4] !text-white !border-none hover:!bg-[#087bb3]"
              size="large"
              onClick={() => dispatch(clearCart())}
            >
              Continue Shopping
            </Button>
          </Link>,
        ]}
      />

      <div className="mt-8 text-center">
        <Text type="secondary">
          A confirmation email has been sent to your registered email address.
        </Text>
      </div>
    </div>
  )
}