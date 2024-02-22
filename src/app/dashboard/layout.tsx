"use client"

// import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar/navbar.component";
import { NavItems } from "@/global/type";
import server from './dashboard.api';

import './dashboard.part.css';
import { Component, Context, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { GlobalStateContext } from "@/utils/context";

export default function Layouts({ children }: any) {

  // const params = useSearchParams();
  // const path = usePathname() as string;

  const [path, setPath] = useState<string>(usePathname() as string);
  const [nav_items, setNavItems] = useState<NavItems>();
  
  useEffect(() => {
    server.fetchRole()
    .then(res => {
      if (res.role === -1) {
        useRouter().replace('/authorized/signin');
      } else {
        setNavItems(server.fetchNavItems(res.role, path as string));
      }
    });
  }, [path]);

  const change_path = (path: string) => {
    setPath(path);
  }

  // useEffect(() => {
  //   setPath(usePathname());
  //   for (let item of nav_items??[]) {
  //   if (path.slice(path.lastIndexOf('/') + 1) === item.href.slice(path.lastIndexOf('/') + 1)) item.active = true;
  //   else item.active = false;
  // }
  // }, [path === usePathname()]);
  
  return (
    <>
      <div className="nav-area">
        <Navbar nav_items={nav_items} change_path_func={change_path} />
      </div>
      <div className="dashboard-body">
        {children}
      </div>
    </>
  )
}

// interface LayoutProps {
//   children: ReactNode;
// }

// interface LayoutState {
//   role: number;
// }

// export default class Layout extends Component<LayoutProps, LayoutState> {

//   router = useRouter();
//   nav_items: NavItems;
//   dashboardLayoutContext: Context<(idx: number) => void>;
//   children: ReactNode;

//   constructor({ children }: { children: ReactNode }) {
//     super({ children });
//     this.state = {
//       role: 0,
//     }
    
//     this.dashboardLayoutContext = createContext((idx: number) => this.setState({ role: idx }));
//     this.children = children;
//     this.nav_items = server.fetchNavItems(this.state.role, this.router.pathname);
//   }

//   public getContext() {
//     return this.dashboardLayoutContext;
//   }

//   render() {
//     return (
//       <>
//         <div className="nav-area">
//           <Navbar nav_items={this.nav_items} />
//         </div>
//         <div className="dashboard-body">
//           <this.dashboardLayoutContext.Provider value={ (idx: number) => this.setState(idx) }>
//             {this.children}
//           </this.dashboardLayoutContext.Provider>
//         </div>
//       </>
//     )
//   }
// }