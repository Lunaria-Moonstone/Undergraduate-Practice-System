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
  }
}