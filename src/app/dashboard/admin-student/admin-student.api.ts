import { Students, Student } from '@/global/type';

export default {
  fetchStudent(): Students {
    const students: Students = [
      {
        id: '10086',
        name: 'Asia',
        number: '20044231',
        grade: '2020',
        phone: '110',
        mail: '110@outlook.com',
        is_practice: false,
        practice_cmp: [],
        has_proof: false,
        has_vitae: false,
      },
      {
        id: '10086',
        name: 'Asia',
        number: '20044231',
        grade: '2020',
        phone: '110',
        mail: '110@outlook.com',
        is_practice: false,
        practice_cmp: [],
        has_proof: false,
        has_vitae: false,
      },
      {
        id: '10086',
        name: 'Asia',
        number: '20044231',
        grade: '2020',
        phone: '110',
        mail: '110@outlook.com',
        is_practice: false,
        practice_cmp: [],
        has_proof: false,
        has_vitae: false,
      },
    ];
    return students;
  }
}