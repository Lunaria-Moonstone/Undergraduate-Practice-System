"use client"

import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/global/global-style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap')
  }, []);
  return (
    <html lang="ch-hans">
      <head>
        <title>高校实习服务系统</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
