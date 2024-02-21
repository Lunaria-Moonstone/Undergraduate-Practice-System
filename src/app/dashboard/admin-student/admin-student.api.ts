import { Students, Student } from '@/global/type';
import axios from 'axios';

const require_route = '/dashboard/admin-student/api/';

export default {
  async fetchStudents(): Promise<Students> {
    let students: Students = (await axios({
       url: require_route,
       method: 'get',
    })).data['results'] as Students;
    return students;
  },
  async fetchStudent(id: string): Promise<Student> {
    let student: Student = (await axios({
      url: require_route,
      method: 'get',
      params: { id }
    })).data['results'][0] as Student;
    return student;
  },
  async addStudent(data: {
    name: string, 
    number: string,
    grade: string,
  }): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'post',
      data: { ...data, phone: '', mail: '' }
    });
    return results.data['ok'];
  },
  async delStudent(id: string): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'delete',
      params: { id }
    });
    return results.data['ok'];
  }, 
  async updateStudent(id: string, data: { [key: string]: string }): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'put',
      params: { id },
      data: data
    });
    return results.data['ok'];
  }
}