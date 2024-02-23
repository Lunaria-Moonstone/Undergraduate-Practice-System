'use client'

import { ReactNode, useEffect, useState } from "react";


import { NavItems } from "@/global/type";

import './navbar.component.css';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar(props: any) {
  const router = useRouter();
  const { nav_items }: { nav_items: NavItems } = props
  const { name }: { name: string } = props;
  const { change_path_func }: { change_path_func: ((path: string) => void) | undefined } = props;

  const [item_btns, setItemBtns] = useState<ReactNode>(<></>);

  const logout = () => {
    axios({
      url: '/authorized/signin/api',
      method: 'delete',
    });
    router.replace('/authorized/signin');
  }

  useEffect(() => {
    setItemBtns(nav_items ? nav_items.map((x, index) => {
      if (x.active) return (<a type="button" className="list-group-item list-group-item-action active" onClick={() => {
        router.replace(x.href);
        if (change_path_func) change_path_func(x.href);
      }} key={index} >{x.label}</a>)
      return (<a type="button" className="list-group-item list-group-item-action" key={index} onClick={() => {
        router.push(x.href);
        if (change_path_func) change_path_func(x.href);
      }}>{x.label}</a>)
    }) : <></>)
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
          <a className="link-secondary text-decoration-none" style={{ cursor: 'default' }}>{ name }</a>
          <a className="link-secondary text-decoration-none" onClick={logout} style={{ cursor: 'pointer' }} >登出</a>
        </div>
      </div>
    </>
  )
}