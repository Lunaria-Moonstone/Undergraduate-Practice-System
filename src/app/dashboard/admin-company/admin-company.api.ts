import axios from 'axios';

import { Companies } from "@/global/type";

export default {
  async fetchCompanies(): Promise<Companies> {
    let companies: Companies = (await axios({
      url: '/dashboard/admin-company/api/',
      method: 'get',
    })).data as Companies;
    return companies;
  }
}