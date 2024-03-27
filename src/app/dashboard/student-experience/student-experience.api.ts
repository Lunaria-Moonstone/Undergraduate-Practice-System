import { Companies, StudentPracticeExperiencies } from "@/global/type"
import axios from "axios";

export default {
  async fetchExperience(): Promise<StudentPracticeExperiencies> {
    const items: StudentPracticeExperiencies = (await axios({
      url: '/dashboard/student-experience/api',
      method: 'get'
    })).data['results'];
    return items;
  },
  async fetchCompanies(): Promise<Companies> {
    const items: Companies = (await axios({
      url: '/dashboard/admin-company/api/',
      method: 'get',
    })).data['results'] as Companies;
    return items;
  },
  async addExperience(data: {
    company_id: string,
    start: string,
    end?: string,
    checked?: boolean,
  }): Promise<boolean> {
    const result = (await axios({
      url: '/dashboard/student-experience/api',
      method: 'post',
      data: data
    })).data;
    return result['ok'];
  },
  async delExperience(id: string) {
    const result = (await axios({
      url: '/dashboard/student-experience/api',
      method: 'delete',
      params: { id }
    })).data;
    return result['ok'];
  }
}