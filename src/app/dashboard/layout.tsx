"use client"

// import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar/navbar.component";
import { NavItems } from "@/global/type";
import server from './dashboard.api';

import './dashboard.part.css';
import { Component, Context, ReactNode, createContext, useContext, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { GlobalStateContext } from "@/utils/context";

export default function Layouts({ children }: any) {

  // const params = useSearchParams();
  const path = usePathname() as string;
  const roleState = useContext(GlobalStateContext);
  // const nav_items: NavItems = server.fetchNavItems(roleState['role'][0] as number, path);
  const [nav_items, setNavItems] = useState<NavItems>(server.fetchNavItems(roleState['role'][0] as number, path));

  server.fetchRole()
    .then(res => {
      if (res.role === -1) {
        useRouter().replace('/authorized/signin');
      } else {
        setNavItems(server.fetchNavItems(res.role, path));
      }
    })

  return (
    <>
      <div className="nav-area">
        <Navbar nav_items={nav_items} />
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