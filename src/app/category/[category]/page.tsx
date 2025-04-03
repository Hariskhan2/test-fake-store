'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Select, Pagination, Button, Input, Row, Col, Typography, Breadcrumb } from 'antd'

import { useGetProductsByCategoryQuery } from '@/__Api__/productApi'

import ProductCard from '@/components/cards/ProductCard'

const { Title } = Typography
const { Option } = Select
const { Search } = Input

const PAGE_SIZE = 4

export default function CategoryPage() {
  const params = useParams()
  const category = Array.isArray(params.category) ? params.category[0] : params.category || ''
  
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [searchQuery, setSearchQuery] = useState('')

  const { data: products = [], isLoading, error } = useGetProductsByCategoryQuery(category)

  const processedProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating.rate - a.rating.rate
        default: return 0
      }
    })

  const totalProducts = processedProducts.length
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  if (isLoading) return <div className="text-center py-12">Loading products...</div>
  if (error) return <div className="text-center py-12">Error loading products</div>

  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: categoryName,
    },
  ]
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-4" />
      <Title level={2} className="capitalize text-center mb-6">
        {categoryName}
      </Title>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search products"
            allowClear
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Select
            defaultValue="featured"
            className="w-full"
            onChange={setSortOption}
          >
            <Option value="featured">Featured</Option>
            <Option value="price-low">Price: Low to High</Option>
            <Option value="price-high">Price: High to Low</Option>
            <Option value="rating">Top Rated</Option>
          </Select>
        </Col>
        
        <Col xs={24} sm={24} md={8}>
          <div className="flex items-center">
            <Select
              defaultValue="0-1000"
              className="w-full"
              onChange={(value) => setPriceRange(value.split('-').map(Number) as [number, number])}
            >
              <Option value="0-50">Under $50</Option>
              <Option value="50-100">$50 - $100</Option>
              <Option value="100-500">$100 - $500</Option>
              <Option value="500-1000">$500 - $1000</Option>
              <Option value="0-1000">All Prices</Option>
            </Select>
          </div>
        </Col>
      </Row>

      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={totalProducts}
              pageSize={PAGE_SIZE}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Title level={4}>No products found matching your criteria</Title>
          <Button 
            type="primary" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('')
              setPriceRange([0, 1000])
              setSortOption('featured')
              setCurrentPage(1)
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}