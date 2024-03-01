import { Teachers,Teacher } from "@/global/type";
import axios from "axios";

export default {
  async fetchName() {
    let results = (await axios({
      url: '/dashboard/student-info/api/account',
      method: 'get',
    })).data;
    return results;
  },
  async submitAccountChange(password: string, new_password: string) {
    let results = (await axios({
      url: '/dashboard/student-info/api/account',
      method: 'put',
      data: { password, new_password },
    })).data;
    return results;
  },
  async resign() {
    axios({
      url: '/authorized/signin/api',
      method: 'delete'
    });
  },

  async fetchInfo() {
    let results = (await axios({
      url: '/dashboard/student-info/api/info',
      method: 'get',
    })).data;
    // console.log(results);
    return results;
  },
  async submitInfoChange(data: {[key: string]: string}) {
    let results = (await axios({
      url: '/dashboard/student-info/api/info',
      method: 'put',
      data
    })).data;
    return results;
  },

  async fetchStudentMap(): Promise<Teachers> {
    let results = (await axios({
      url: '/dashboard/student-teacher-map/',
      method: 'get',
    })).data;
    // return results['ok'] && results['results'].length !== 0;
    return results['results'];
  },
  async fetchTeachers(): Promise<Teachers> {
    let results: Teachers = (await axios({
      url: '/dashboard/admin-teacher/api',
      method: 'get',
    })).data['results'] as Teachers;
    return results;
  },
  async mountTeacher(id: string): Promise<boolean> {
    let results = (await axios({
      url: '/dashboard/student-teacher-map/',
      method: 'post',
      data: { id },
    })).data;
    return results['ok'];
  }
}