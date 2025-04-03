'use client'
import { store } from './store'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import AntdWrapper from '@/components/antd/AntdWrapper'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AntdWrapper>
        {children}
      </AntdWrapper>
    </Provider>
  )
}