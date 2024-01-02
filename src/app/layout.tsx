import type { Metadata } from 'next'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Graduate Practice Service System',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ch-hans">
      <head></head>
      <body>{children}</body>
    </html>
  )
}
