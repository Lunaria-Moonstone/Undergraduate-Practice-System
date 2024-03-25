'use client'

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, MenuProps } from 'antd';

import axios from "axios";

import { NavItems } from "@/global/type";

import './navbar.component.css';

type MenuItem = Required<MenuProps>['items'][number];

export default function Navbar(props: any) {
  const router = useRouter();
  const { nav_items }: { nav_items: NavItems } = props
  const [items, setItems] = useState<MenuItem[]>([]);


  // const { name }: { name: string } = props;
  const { change_path_func }: { change_path_func: ((path: string) => void) | undefined } = props;

  // const [item_btns, setItemBtns] = useState<ReactNode>(<></>);

  // const logout = () => {
  //   axios({
  //     url: '/authorized/signin/api',
  //     method: 'delete',
  //   });
  //   router.replace('/authorized/signin');
  // }

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ) => {
    return {
      key, icon, children, label, type,
    } as MenuItem;
  };

  const onClick = (e: any) => {
    if (e.key === 'logout') {
      fetch('/authorized/signin/api', {
        method: 'DELETE',
      });
      router.replace('/authorized/signin/');
      return;
    }
    router.replace(e.key);
    if (change_path_func) { change_path_func(e.key) }
  }

  useEffect(() => {
    setItems(
      [...nav_items.map((x, _) => {
        return getItem(x.label, x.href, undefined, undefined, undefined)
      }), getItem('退出登录', 'logout', undefined, undefined, undefined)]
    )
  }, [nav_items])

  // useEffect(() => {
  //   setItemBtns(nav_items ? nav_items.map((x, index) => {
  //     if (x.active) return (<a type="button" className="list-group-item list-group-item-action active" onClick={() => {
  //       router.replace(x.href);
  //       if (change_path_func) change_path_func(x.href);
  //     }} key={index} >{x.label}</a>)
  //     return (<a type="button" className="list-group-item list-group-item-action" key={index} onClick={() => {
  //       router.push(x.href);
  //       if (change_path_func) change_path_func(x.href);
  //     }}>{x.label}</a>)
  //   }) : <></>)
  // }, [nav_items]);

  return (
    <>
      <div className="nav-body">
        <div className="nav-head">
          <h2>高校毕业实习服务中心</h2>
          {/* <div className="navitems-line">
            <div className="list-group ">
              {item_btns}
            </div>
          </div> */}

        </div>
        <div className="nav-items">
          <Menu
            onClick={onClick}
            mode="inline"
            items={items}
            style={{
              height: '100%',
              width: '100%',
              // backgroundColor: 'var(--main-color-lightgray)',
              padding: '8px 8px'
            }}
          />
        </div>

        {/* <div className="userinfo-line">
          <a className="link-secondary text-decoration-none" style={{ cursor: 'default' }}>{name}</a>
          <a className="link-secondary text-decoration-none"  style={{ cursor: 'pointer' }} >登出</a>
        </div> */}
      </div>
    </>
  )
}