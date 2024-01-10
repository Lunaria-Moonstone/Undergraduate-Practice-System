import { JobAudits } from "@/global/type";

export default {
  fetchJobAudit(): JobAudits {
    let items: JobAudits = [
      {id: '10086', student_id: '10086', company_id: '10086', job_id: '10086', progress: 'reading'},
    ]
    return items;
  }
}