import { StudentWithJob, StudentsWithJob } from "@/global/type";
import axios from "axios";

export default {
  async fetchStudents(): Promise<StudentsWithJob> {
    const results: StudentsWithJob = (await axios({
      url: '/dashboard/company-student/api',
      method: 'get',
    })).data['results'];
    return results;
  },
  async updateStudent(id: string, status: string, feedback: string ): Promise<boolean> {
    const results = (await axios({
      url: '/dashboard/company-student/api',
      method: 'patch',
      params: { id },
      data: { progress: status, feedback }
    })).data;
    return results['ok'];
  }
}