import axios from 'axios';

import { Companies } from "@/global/type";

export default {
  async fetchCompanies(): Promise<Companies> {
    let companies: Companies = (await axios({
      url: '/dashboard/admin-company/api/',
      method: 'get',
    })).data['results'] as Companies;
    return companies;
  },
  async addCompany(): Promise<boolean> {
    let results = await axios({
      url: '/dashboard/admin-company/api/',
      method: 'post',
    });
    return results.data['ok'];
  },
  async delCompany(): Promise<boolean> {
    let results = await axios({
      url: '/dashboard/admin-company/api/',
      method: 'delete'
    });
    return results.data['ok'];
  }, 
  async updateCompany(): Promise<boolean> {
    let results = await axios({
      url: '/dashboard/admin-company/api/',
      method: 'put',
    });
    return results.data['ok'];
  }
}