import BannerSectionCard from '@/components/cards/BannerSectionCard'
import Categories from '@/components/categories/Categories'
import FeaturedProducts from '@/components/products/FeaturedProducts'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <BannerSectionCard />
        <Categories />
        <FeaturedProducts />
      </main>
    </div>
  )
}

export default Home