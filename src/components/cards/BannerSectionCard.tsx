'use client'
import { Carousel } from 'antd'
import Image from 'next/image'
import Banner1 from '@/assets/jpgs/shirt1.jpg'
import Banner2 from '@/assets/jpgs/shirt2.jpg'
import Banner3 from '@/assets/jpgs/shirt3.jpg'

const BannerSectionCard = () => {
  const banners = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% Off',
      image: Banner1,
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Discover the latest trends',
      image: Banner2,
    },
    {
      id: 2,
      title: 'Winter Sale',
      subtitle: 'Discover the New arrival',
      image: Banner3,
    },
  ]

  return (
    <Carousel autoplay className="h-[80vh]">
      {banners.map((banner) => (
        <div key={banner.id} className="relative h-[80vh] w-full">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-9xl font-bold mb-2">{banner.title}</h2>
            <p className="text-4xl">{banner.subtitle}</p>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default BannerSectionCard