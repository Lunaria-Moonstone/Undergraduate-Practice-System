// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

import { NavItems } from "@/global/type"
import axios from "axios";

export default {
  async fetchRole(): Promise<{ name: string, role: -1 | 0 | 1 | 2 | 3 }> {
    let result = (await axios({
      url: '/dashboard/api/',
      method: 'get',
    })).data;
    return { name: result.name, role: result.role };
  },
  fetchNavItems(role: number, path: string): NavItems {
    path = path.slice(path.lastIndexOf('/') + 1);
    if (role == 0) {
      const items: NavItems = [
        { label: '管理员首页', href: '/dashboard/admin-home' },
        { label: '学生信息管理', href: '/dashboard/admin-student' },
        { label: '教师信息管理', href: '/dashboard/admin-teacher' },
        { label: '企业信息管理', href: '/dashboard/admin-company' },
        { label: '个人信息设置', href: '/dashboard/admin-info'},
      ];
      switch(path) {
        case 'admin-home': 
        items[0]['active'] = true;
        break;
        case 'admin-student':
        items[1]['active'] = true;
        break;
        case 'admin-teacher':
        items[2]['active'] = true;
        break;
        case 'admin-company':
        items[3]['active'] = true;
        break;
        case 'admin-info':
        items[4]['active'] = true;
      }
      return items;
    } 
    else if (role === 1) {
      const items: NavItems = [
        { label: '个人中心', href: '/dashboard/student-home' },
        { label: '个人信息设置', href: '/dashboard/student-info' },
        { label: '个人材料上传', href: '/dashboard/student-annex' },
        { label: '实习经历一览', href: '/dashboard/student-experience' },
        { label: '岗位简历投递', href: '/dashboard/student-job' },
        { label: '简历投递进度', href: '/dashboard/student-job-audit'},
      ];
      switch(path) {
        case 'student-home':
        items[0]['active'] = true;
        break;
        case 'student-info':
        items[1]['active'] = true;
        break;
        case 'student-annex':
        items[2]['active'] = true;
        break;
        case 'student-experience':
        items[3]['active'] = true;
        break;  
        case 'student-job':
        items[4]['active'] = true;
        break;
        case 'student-job-audit':
        items[5]['active'] = true;
        break;
      }
      return items;
    } else if (role === 2) {
      const items: NavItems = [
        { label: '个人中心', href: '/dashboard/teacher-home' },
        { label: '名下学生信息', href: '/dashboard/teacher-student' },
        { label: '个人信息设置', href: '/dashboard/teacher-info' },
      ];
      switch(path) {
        case 'teacher-home':
        items[0]['active'] = true;
        break;
        case 'teacher-student':
        items[1]['active'] = true;
        break;
        case 'teacher-info':
        items[2]['active'] = true;
        break;
      }
      return items;
    } else if (role === 3) {
      const items: NavItems = [
        { label: '企业中心', href: '/dashboard/company-home' },
        { label: '招聘岗位设置', href: '/dashboard/company-job' },
        { label: '应聘人员一览', href: '/dashboard/company-student' },
        { label: '企业信息设置', href: '/dashboard/company-info' },
      ];
      switch(path) {
        case 'company-home':
        items[0]['active'] = true;
        break;
        case 'company-job':
        items[1]['active'] = true;
        break;
        case 'company-student':
        items[2]['active'] = true;
        break;
        case 'company-info':
        items[3]['active'] = true;
        break;
      }
      return items;
    } else {
      return [

      ];
    }
  }
}