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
  }
}