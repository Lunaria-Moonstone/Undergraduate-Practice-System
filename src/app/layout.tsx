"use client"

import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// import { GlobalStateContext } from "@/utils/context";
import '@/global/global-style.css';
import { GlobalStateVariableType } from "@/global/type";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /**
   * 设置全局变量
   */
  // const [current_role, setCurrentRole] = useState<number>(0); // 当前登录角色处理

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap')
  }, []);
  
  return (
    <html lang="ch-hans">
      <head>
        <title>高校实习服务系统</title>
      </head>
      <body>
        {/* <GlobalStateContext.Provider value={{role: [current_role, setCurrentRole as (val: GlobalStateVariableType) => void]}}> */}
          {children}
        {/* </GlobalStateContext.Provider> */}
      </body>
    </html>
  )
}
