import React from 'react'
import BrandPanel from './BrandPanel'
import LoginForm from './LoginForm'
import { Page } from '@/components/layout/page'

export default function AuthLayout() {
  return (
    <Page className='grid lg:grid-cols-2 py-0'>
        <BrandPanel />
        <LoginForm />
    </Page>
  )
}
