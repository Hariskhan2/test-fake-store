'use client'
import '@ant-design/v5-patch-for-react-19'
import { App as AntdApp } from 'antd'
import { ReactNode } from 'react'

export default function AntdWrapper({ children }: { children: ReactNode }) {
  return <AntdApp>{children}</AntdApp>
}