import { Teachers, Teacher } from '@/global/type';
import axios from 'axios';

const require_route = '/dashboard/admin-teacher/api/';

export default {
  async fetchTeachers(): Promise<Teachers> {
    let teachers: Teachers = (await axios({
       url: require_route,
       method: 'get',
    })).data['results'] as Teachers;
    return teachers;
  },
  async fetchTeacher(id: string): Promise<Teacher> {
    let teacher: Teacher = (await axios({
      url: require_route,
      method: 'get',
      params: { id }
    })).data['results'][0] as Teacher;
    return teacher;
  },
  async addTeacher(data: {
    name: string, 
    number: string,
    phone: string,
    mail: string,
  }): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'post',
      data
    });
    return results.data['ok'];
  },
  async delTeacher(id: string): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'delete',
      params: { id }
    });
    return results.data['ok'];
  }, 
  async updateTeacher(id: string, data: { [key: string]: string }): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'put',
      params: { id },
      data: data
    });
    return results.data['ok'];
  }
}