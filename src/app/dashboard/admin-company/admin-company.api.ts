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
  async addCompany(data: { name: string, phone: string, mail: string, lisence: string }): Promise<boolean> {
    let results = await axios({
      url: '/dashboard/admin-company/api/',
      method: 'post',
      data
    });
    return results.data['ok'];
  },
  async delCompany(id: string): Promise<boolean> {
    let results = await axios({
      url: '/dashboard/admin-company/api/',
      method: 'delete',
      params: { id }
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