'use client'
import Image from 'next/image';
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { Card, Button, Rate, message } from 'antd'

import { useGetProductByIdQuery } from '@/__Api__/productApi'

import { addToCart } from '@/store/reducers/cartSlice'

const ProductDetailPage = () => {
  const params = useParams()
  const productId = Number(params.id)
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId)
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
      messageApi.success(`${product.title} added to cart!`)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>
  if (!product) return <div>Product not found</div>

  return (
    <>
      {contextHolder}
      <Card className="w-full mx-auto shadow-lg rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[500px]">
          <div className="flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              className="h-[500px] object-contain p-8"
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800">{product.title}</h2>
            
            <p className="text-gray-500 text-md mt-4">{product.description}</p>
            <div className="flex items-center mt-2">
              <Rate disabled defaultValue={product.rating?.rate} />
              <span className="text-gray-500 ml-2">({product.rating?.count})</span>
            </div>
            <div className="mt-6">
              <span className="text-xl font-bold text-[#0a96d4]">${product.price}</span>
            </div>

            <div className="mt-8 flex space-x-4">
              <Button 
                type="primary" 
                className="bg-[#0a96d4] text-white border-none hover:bg-[#087bb3]"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ProductDetailPage