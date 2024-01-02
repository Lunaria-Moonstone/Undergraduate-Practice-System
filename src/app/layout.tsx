import { useEffect } from 'react'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ch-hans">
      <head>
        <title>高校实习服务系统</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
