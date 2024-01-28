import { StudentWithJob, StudentsWithJob } from "@/global/type";

export default {
  fetchStudents(): StudentsWithJob {
    const items: StudentsWithJob = [
      {
        id: '10086',
        student_id: '10086',
        student_name: 'nick',
        job_id: '10086',
        job_name: '保安',
        progress: 'unread',
        company_id: '10086',
      }
    ];  
    return items;
  },
  fetchStudent(): StudentWithJob {
    return {
      id: '10086',
      student_id: '10086',
      student_name: 'nick',
      job_id: '10086',
      job_name: '保安',
      progress: 'unread',
      company_id: '10086',
    }
  }
}