'use client'

import { ReactNode, useEffect, useState } from "react";


import { NavItems } from "@/global/type";

import './navbar.component.css';
import { useRouter } from "next/navigation";

export default function Navbar(props: any) {
  const router = useRouter();
  const { nav_items }: { nav_items: NavItems } = props
  // const item_btns: ReactNode = nav_items ? nav_items.map((x, index) => {
  //   if (x.active) return (<a type="button" className="list-group-item list-group-item-action active" onClick={() => router.push(x.href)} key={index} >{x.label}</a>)
  //   return (<a type="button" className="list-group-item list-group-item-action" key={index} onClick={() => router.push(x.href)}>{x.label}</a>)
  // }) : <></>
  const [item_btns, setItemBtns] = useState<ReactNode>(<></>);
  
  useEffect(() => {
    setItemBtns(nav_items ? nav_items.map((x, index) => {
      if (x.active) return (<a type="button" className="list-group-item list-group-item-action active" onClick={() => router.push(x.href)} key={index} >{x.label}</a>)
      return (<a type="button" className="list-group-item list-group-item-action" key={index} onClick={() => router.push(x.href)}>{x.label}</a>)
    }) : <></>)
    console.log(1);
  }, [nav_items]);

  return (
    <>
      <div className="nav-body">
        <div className="nav-head">
          <h2>高校毕业实习服务中心</h2>
          {/* 导航栏选项区域 */}
          <div className="navitems-line">
            <div className="list-group ">
              {item_btns}
            </div>
          </div>
        </div>
        {/* 导航栏用户信息区域 */}
        <div className="userinfo-line">
          <a className="link-secondary text-decoration-none" href="#">LAIN</a>
          <a className="link-secondary text-decoration-none" href="/authorized/signin">登出</a>
        </div>
      </div>
    </>
  )
}