'use client'
import { useGetAllProductsQuery } from '@/__Api__/productApi'
import ProductCard from '@/components/cards/ProductCard'
import { Typography } from 'antd'

const { Title } = Typography

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery()

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error loading products</div>

  const featuredProducts = products?.slice(0, 8) || []

  return (
    <section className="container mx-auto px-4 py-12">
      <Title level={2} className="text-center mb-8">Featured Products</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts