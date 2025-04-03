'use client'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '@/store/hooks'
import { Button, Form, Input, Radio, Card, Typography, Divider } from 'antd'

import Link from 'next/link'

const { Title, Text } = Typography
const { TextArea } = Input

type FormValues = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  paymentMethod: 'credit' | 'paypal' | 'bank'
  cardNumber?: string
  cardName?: string
  expiry?: string
  cvv?: string
  notes?: string
}

export default function CheckoutPage() {
  const { items:cartItems, totalPrice } = useAppSelector(state => state.cart)
  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      paymentMethod: 'credit',
    },
  })

  const paymentMethod = watch('paymentMethod')

  const onSubmit = () => {
    window.location.href = '/checkout/success'
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Title level={2}>Your cart is empty</Title>
        <Link href="/">
          <Button type="primary" className="mt-4">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">
        Checkout
      </Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Card title="Personal Information" className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name' }]}
                  validateStatus={errors.firstName ? 'error' : ''}
                  help={errors.firstName?.message}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name' }]}
                  validateStatus={errors.lastName ? 'error' : ''}
                  help={errors.lastName?.message}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { 
                      required: true, 
                      message: 'Please input your email' 
                    },
                    {
                      type: 'email',
                      message: 'Please enter a valid email',
                    }
                  ]}
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email?.message}
                >
                  <Input />
                </Form.Item>
              </div>
            </Card>

            <Card title="Shipping Address" className="mb-6">
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address' }]}
                validateStatus={errors.address ? 'error' : ''}
                help={errors.address?.message}
              >
                <Input />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: 'Please input your city' }]}
                  validateStatus={errors.city ? 'error' : ''}
                  help={errors.city?.message}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="State/Province"
                  name="state"
                  rules={[{ required: true, message: 'Please input your state/province' }]}
                  validateStatus={errors.state ? 'error' : ''}
                  help={errors.state?.message}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="ZIP/Postal Code"
                  name="zipCode"
                  rules={[{ required: true, message: 'Please input your ZIP/postal code' }]}
                  validateStatus={errors.zipCode ? 'error' : ''}
                  help={errors.zipCode?.message}
                >
                  <Input />
                </Form.Item>
              </div>

              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: 'Please input your country' }]}
                validateStatus={errors.country ? 'error' : ''}
                help={errors.country?.message}
              >
                <Input />
              </Form.Item>
            </Card>

            <Card title="Payment Method" className="mb-6">
              <Form.Item
                name="paymentMethod"
                rules={[{ required: true, message: 'Please select a payment method' }]}
              >
                <Radio.Group>
                  <Radio value="credit">Credit Card</Radio>
                  <Radio value="paypal">PayPal</Radio>
                  <Radio value="bank">Bank Transfer</Radio>
                </Radio.Group>
              </Form.Item>

              {paymentMethod === 'credit' && (
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      label="Card Number"
                      name="cardNumber"
                      rules={[{ required: true, message: 'Please input your card number' }]}
                      validateStatus={errors.cardNumber ? 'error' : ''}
                      help={errors.cardNumber?.message}
                    >
                      <Input placeholder="1234 5678 9012 3456" />
                    </Form.Item>

                    <Form.Item
                      label="Name on Card"
                      name="cardName"
                      rules={[{ required: true, message: 'Please input name on card' }]}
                      validateStatus={errors.cardName ? 'error' : ''}
                      help={errors.cardName?.message}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Expiry Date"
                      name="expiry"
                      rules={[{ required: true, message: 'Please input expiry date' }]}
                      validateStatus={errors.expiry ? 'error' : ''}
                      help={errors.expiry?.message}
                    >
                      <Input placeholder="MM/YY" />
                    </Form.Item>

                    <Form.Item
                      label="CVV"
                      name="cvv"
                      rules={[{ required: true, message: 'Please input CVV' }]}
                      validateStatus={errors.cvv ? 'error' : ''}
                      help={errors.cvv?.message}
                    >
                      <Input placeholder="123" />
                    </Form.Item>
                  </div>
                </div>
              )}
            </Card>

            <Card title="Additional Information" className="mb-6">
              <Form.Item label="Order Notes" name="notes">
                <TextArea rows={4} placeholder="Notes about your order..." />
              </Form.Item>
            </Card>

            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full !bg-[#0a96d4] !text-white !border-none hover:!bg-[#087bb3]"
              size="large"
            >
              Place Order
            </Button>
          </Form>
        </div>

        <div>
          <Card title="Order Summary" className="sticky top-4">
            <div className="space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <Text strong>{item.title}</Text>
                    <Text type="secondary" className="block">
                      {item.quantity} × ${item.price}
                    </Text>
                  </div>
                  <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                </div>
              ))}

              <Divider className="my-4" />

              <div className="flex justify-between">
                <Text strong>Subtotal</Text>
                <Text>${totalPrice.toFixed(2)}</Text>
              </div>

              <div className="flex justify-between">
                <Text strong>Shipping</Text>
                <Text>Free</Text>
              </div>

              <div className="flex justify-between">
                <Text strong>Tax</Text>
                <Text>$0.00</Text>
              </div>

              <Divider className="my-4" />

              <div className="flex justify-between">
                <Text strong className="text-lg">Total</Text>
                <Text strong className="text-lg">
                  ${totalPrice.toFixed(2)}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}