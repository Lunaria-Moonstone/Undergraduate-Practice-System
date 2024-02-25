import { Jobs } from "@/global/type";
import axios from "axios";

export default {
  async fetchJobs(): Promise<Jobs> {
    const jobs: Jobs = (await axios({
      url: '/dashboard/student-job/api',
      method: 'get'
    })).data['results'];
    return jobs;
  }
}