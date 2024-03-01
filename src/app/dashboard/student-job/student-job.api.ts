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
  async submitApply(id: string, resume: string): Promise<Job> {
    const result = (await axios({
      url: '/dashboard/student-job/api',
      method: 'post',
      params: { id },
      data: { resume }
    })).data['ok'];
    return result;
  },
  
  async fetchResumeId(): Promise<string[]> {
    const results = (await axios({
      url: '/dashboard/student-annex/api',
      method: 'get'
    })).data;
    const id_list = (results['results']['vitae']['results'] as Array<{ id: string, base64code: string, created: string }>).map(x => x.id);
    return id_list;
  }
}