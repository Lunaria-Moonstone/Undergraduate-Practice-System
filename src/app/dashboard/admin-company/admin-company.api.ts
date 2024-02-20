import axios from 'axios';

import { Companies, Company } from "@/global/type";

export default {
  async fetchCompanies(): Promise<Companies> {
    let companies: Companies = (await axios({
      url: '/dashboard/admin-company/api/',
      method: 'get',
    })).data['results'] as Companies;
    return companies;
  },
  async fetchCompany(id: string): Promise<Company> {
    let company: Company = (await axios({
      url: '/dashboard/admin-company/api/',
      method: 'get',
      params: { id }
    })).data['results'][0] as Company;
    return company;
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
  async updateCompany(id: string, data: { [key: string]: string }): Promise<boolean> {
    let results = await axios({
      url: '/dashboard/admin-company/api/',
      method: 'put',
      params: { id },
      data: data
    });
    return results.data['ok'];
  }
}