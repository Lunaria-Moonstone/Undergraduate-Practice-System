"use client"

import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

import Navbar from "@/components/navbar/navbar.component";
import { NavItems } from "@/global/type";
import server from './dashboard.api';

import './dashboard.part.css';
import { createContext, useState } from "react";

export const myContext = createContext<{ [key: string]: Function }>({});

export default function Layout({ children, }: any) {
  
  const path = usePathname() as string;
  const [role, setRole] = useState(0);
  const nav_items: NavItems = server.fetchNavItems(role, path);
  
  return (
    <>
      <div className="nav-area">
        <Navbar nav_items={nav_items} />
      </div>
      <div className="dashboard-body">
        <myContext.Provider value={{changeRole: setRole}}>
          {children}
        </myContext.Provider>
      </div>
    </>
  )
}