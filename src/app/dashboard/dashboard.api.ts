// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

import { NavItems } from "@/global/type"

export default {
  fetchNavItems(role: number, path: string): NavItems {
    path = path.slice(path.lastIndexOf('/') + 1);
    if (role == 0) {
      const items: NavItems = [
        { label: '首页', href: '/dashboard' },
        { label: '学生信息管理', href: '/dashboard/admin-student' },
        { label: '教师信息管理', href: 'www.baidu.com' },
        { label: '企业信息管理', href: 'www.baidu.com' },
      ];
      switch(path) {
        case 'dashboard': 
        items[0]['active'] = true;
        break;
        case 'admin-student':
        items[1]['active'] = true;
        break;
      }
      return items;
    } else { 
      return [
    
      ]
    }
  }
}