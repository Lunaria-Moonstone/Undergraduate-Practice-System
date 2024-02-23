import axios from "axios"

export default {
  async fetchName() {
    let results = (await axios({
      url: '/dashboard/admin-info/api',
      method: 'get',
    })).data;
    return results;
  },
  async submitChange(password: string, new_password: string) {
    let results = (await axios({
      url: '/dashboard/admin-info/api',
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
  }
}