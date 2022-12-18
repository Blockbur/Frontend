import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

interface WeirdsLayoutProps {
  children: React.ReactNode
}

export function WeirdsLayout({ children }: WeirdsLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
