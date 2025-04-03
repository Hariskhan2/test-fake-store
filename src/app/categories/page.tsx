'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox, Pagination, Select, Input, Button, Row, Col, Card, Typography, Spin } from 'antd';

import { useGetAllCategoriesQuery, useGetAllProductsQuery, useGetProductsByCategoryQuery } from '@/__Api__/productApi';

import ProductCard from '@/components/cards/ProductCard';

const { Title, Text } = Typography
const { Option } = Select
const { Search } = Input

const PAGE_SIZE = 8

export default function CategoriesPage() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [searchQuery, setSearchQuery] = useState('')

  const { data: categories = [], isLoading: isCategoriesLoading } = useGetAllCategoriesQuery()
  const { data: allProducts = [], isLoading: isAllProductsLoading, error: allProductsError } = useGetAllProductsQuery()

  const { data: categoryProducts = [], isLoading: isCategoryProductsLoading, error: categoryProductsError } = useGetProductsByCategoryQuery(
    selectedCategories.length === 1 ? selectedCategories[0] : ''
  )

  const productsToDisplay = () => {
    if (selectedCategories.length === 0) return allProducts || []
    if (selectedCategories.length === 1) return categoryProducts || []
    return (allProducts || []).filter(p => selectedCategories.includes(p.category))
  }

  const filteredProducts = (productsToDisplay() || [])
    .filter(product => 
      product?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) &&
      product?.price >= priceRange[0] && 
      product?.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-low': return (a?.price || 0) - (b?.price || 0)
        case 'price-high': return (b?.price || 0) - (a?.price || 0)
        case 'rating': return (b?.rating?.rate || 0) - (a?.rating?.rate || 0)
        default: return 0
      }
    })

  const totalProducts = filteredProducts.length
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
    setCurrentPage(1)
  }

  if (isCategoriesLoading || isAllProductsLoading || (selectedCategories.length === 1 && isCategoryProductsLoading)) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    )
  }

  if (allProductsError || categoryProductsError) {
    return <div className="text-center py-12">Error loading products</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">Browse Products</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card title="Categories" className="sticky top-4">
            <div className="max-h-[400px] overflow-y-auto">
              {categories?.map(category => (
                <div key={category} className="mb-2">
                  <Checkbox
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  >
                    {category?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l.toUpperCase())}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={18}>
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

          {/* Selected Categories */}
          {selectedCategories.length > 0 && (
            <div className="mb-4">
              <Text strong>Showing products in: </Text>
              {selectedCategories.map(category => (
                <Button 
                  key={category} 
                  type="text" 
                  onClick={() => router.push(`/category/${category}`)}
                  className="capitalize"
                >
                  {category?.replace(/-/g, ' ')}
                </Button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
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
                  setSelectedCategories([])
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
        </Col>
      </Row>
    </div>
  )
}