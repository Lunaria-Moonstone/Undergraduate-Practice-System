import { Job, Jobs } from "@/global/type";
import axios from "axios";

export default {
  async fetchJobs(): Promise<Jobs> {
    const items: Jobs = (await axios({
      url: '/dashboard/company-job/api',
      method: 'get',
    })).data['results'];
    return items;
  },
  async delJob(id: string): Promise<boolean> {
    const results = (await axios({
      url: '/dashboard/company-job/api',
      method: 'delete',
      params: { id }
    })).data;
    return results['ok'];
  },
  async addJob(data: { name: string, salary: string, descript: string }): Promise<boolean> {
    const results = (await axios({
      url: '/dashboard/company-job/api',
      method: 'post',
      data,
    })).data;
    console.log()
    return results['ok'];
  },
  async editJob(id: string, data: {[key: string]: string | number}): Promise<boolean> {
    const results = (await axios({
      url: '/dashboard/company-job/api',
      method: 'put',
      params: { id },
      data,
    })).data;
    return results['ok'];
  }
}