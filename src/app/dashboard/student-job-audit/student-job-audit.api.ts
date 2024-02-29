import { JobAudits } from "@/global/type";
import axios from "axios";

export default {
  async fetchJobAudit(): Promise<JobAudits> {
    let results: JobAudits = (await (axios({
      url: '/dashboard/student-job-audit/api',
      method: 'get'
    }))).data['results'];
    return results;
  },
  async cancleJobAudit(id: string): Promise<boolean> {
    let results = (await (axios({
      url: '/dashboard/student-job-audit/api',
      method: 'delete',
      params: {id}
    }))).data['ok'];
    return results;
  }
}