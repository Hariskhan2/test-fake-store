'use client'
import React, { useState, useEffect } from "react"
import { Badge, Dropdown, Drawer } from "antd"
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return { isMobile }
}

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { isMobile } = useResponsive()
  const pathname = usePathname()
  const { items: cartItems } = useAppSelector(state => state.cart)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
  ]

  const cartMenu = {
    items: [
      {
        key: "1",
        label: (
          <div className="w-96 max-[768px]:w-80 p-2 bg-white">
            <p className="font-semibold mb-2">Cart Items ({totalItems})</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between border-b pb-2">
                    <span className="truncate">{item.title}</span>
                    <span>${item.price} × {item.quantity}</span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
            {cartItems.length > 0 && (
              <Link href="/cart" className="block mt-4">
                <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Go to Cart
                </button>
              </Link>
            )}
          </div>
        ),
      },
    ],
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-10">
      <Link href="/" className="text-2xl font-bold">
        <span className="text-black">FAKE</span>
        <span className="text-[#0a96d4]">STORE</span>
      </Link>

      <div className="flex items-center space-x-4">
        {!isMobile ? (
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`
                  !text-gray-700 
                  hover:text-blue-500 
                  transition-colors 
                  ${pathname === item.href 
                    ? 'font-bold text-[#0a96d4] border-b-2 border-[#0a96d4]' 
                    : ''}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : (
          <>
            <button 
              onClick={() => setDrawerVisible(true)} 
              className="!text-gray-700 hover:text-blue-500"
            >
              <MenuOutlined className="text-2xl" />
            </button>
            <Drawer
              title="Menu"
              placement="right"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
            >
              {navItems.map((item) => (
                <div key={item.href} className="py-2">
                  <Link 
                    href={item.href} 
                    onClick={() => setDrawerVisible(false)}
                    className={`
                      block 
                      !text-gray-700 
                      hover:text-blue-500 
                      ${pathname === item.href 
                        ? 'font-bold text-[#0a96d4]' 
                        : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </Drawer>
          </>
        )}

        <Dropdown menu={cartMenu} trigger={['click']} placement="bottomRight">
          <div className="relative cursor-pointer">
            <Badge count={totalItems} size="small">
              <ShoppingCartOutlined className="text-2xl !text-gray-700 hover:text-blue-500 transition-colors" />
            </Badge>
          </div>
        </Dropdown>
      </div>
    </nav>
  )
}

export default Navbar