'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Button, Card, Rate, App } from 'antd'

import { addToCart } from '@/store/reducers/cartSlice'

const { Meta } = Card

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch()
  const { message: messageApi } = App.useApp()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToCart(product))
    messageApi.success(`${product.title} added to cart!`)
  }

  return (
    <Link href={`/productDetail/${product.id}`} passHref legacyBehavior>
      <Card
        hoverable
        className='border !border-[#D9D9D9] rounded-lg'
        cover={
          <div className="h-64 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        }
      >
        <Meta
          title={product.title}
          description={
            <>
              <Rate disabled defaultValue={product.rating?.rate} />
              <div className="mt-2 font-bold text-lg">${product.price}</div>
            </>
          }
        />
        <Button
          className="w-full !h-10 mt-4 !bg-[#0a96d4] !text-white border-none !hover:bg-[#087bb3]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card>
    </Link>
  )
}

export default ProductCard