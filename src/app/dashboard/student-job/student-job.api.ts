import { Jobs, Job } from "@/global/type";
import axios from "axios";

export default {
  async fetchJobs(): Promise<Jobs> {
    const jobs: Jobs = (await axios({
      url: '/dashboard/student-job/api',
      method: 'get'
    })).data['results'];
    return jobs;
  },
  async fetchJob(): Promise<Job> {
    const job: Job = (await axios({
      url: '/dashboard/student-job/api',
      method: 'get'
    })).data['results'][0];
    return job;
  },
  async submitApply(id: string): Promise<Job> {
    const result = (await axios({
      url: '/dashboard/student-job/api',
      method: 'post',
      params: { id }
    })).data['ok'];
    return result;
  },
  
}