import axios from 'axios';

import { Teachers, Teacher } from '@/global/type';
import AccountServer from '../account-manage/account-manage.api';

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
    let results = (await axios({
      url: require_route,
      method: 'post',
      data
    })).data;
    if (results['ok'])
      AccountServer.addAccount(data.number, 2, results['id']);
    return results['ok'];
  },
  async delTeacher(id: string): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'delete',
      params: { id }
    });
    if (results.data['ok']) {
      // 删除账号
      AccountServer.delAccount(2, id);
    }
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
  },
  async searchTeacher(keyword: string): Promise<Teachers> {
    let teachers: Teachers = (await axios({
      url: require_route,
      method: 'get',
      params: { keyword }
    })).data['results'] as Teachers;
    return teachers;
  }
}