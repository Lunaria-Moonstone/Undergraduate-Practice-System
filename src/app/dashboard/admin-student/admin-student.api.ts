import axios from 'axios';

import { Students, Student } from '@/global/type';
import AccountServer from '../account-manage/account-manage.api';
import ExperienceServer from '../student-experience/student-experience.api'
import TSMapServer from '../teacher-student/teacher-student.api'


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
    let results = (await axios({
      url: require_route,
      method: 'post',
      data: { ...data, phone: '', mail: '' }
    })).data;
    if (results['ok']) {
      AccountServer.addAccount(data.number, 1, results['id']);
    }
    return results['ok'];
  },
  async delStudent(id: string): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'delete',
      params: { id }
    });
    console.log(results)
    if (results.data['ok']) {
      // console.log('start del user: ', id)
      AccountServer.delAccount(1, id);
      ExperienceServer.deleteByStudentId(id);
      TSMapServer.deleteStudentById(id);
    }
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
  },
  async searchStudent(keyword: string) {
    let students: Students = (await axios({
      url: require_route,
      method: 'get',
      params: { keyword }
    })).data['results'] as Students;
    return students;
  },
  // getUploadModel(fields: Array<string>) {
  //   axios({

  //   })
  // }
  
}