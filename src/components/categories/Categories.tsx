'use client'
import { useGetAllCategoriesQuery } from '@/__Api__/productApi'
import { Card, Typography } from 'antd'
import Link from 'next/link'

const { Title } = Typography

const Categories = () => {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery()

  if (isLoading) return <div>Loading categories...</div>
  if (error) return <div>Error loading categories</div>

  return (
    <section className="container mx-auto px-4 py-12 ">
      <Title level={2} className="text-center mb-8">Shop by Category</Title>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10  border border-[#D9D9D9] bg-[#F8F8F8]">
        {categories?.map((category) => (
          <Link 
            href={`/category/${category}`} 
            key={category}
            className="capitalize"
          >
            <Card hoverable className="text-center h-full  !border !border-[#D9D9D9]">
              <Title level={4}>
                {category.replace(/-/g, ' ')}
              </Title>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories