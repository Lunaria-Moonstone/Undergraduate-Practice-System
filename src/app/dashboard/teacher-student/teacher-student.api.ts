import { Student, Students } from "@/global/type";

export default {
  fetchStudents(): { 
    id: string, 
    name: string, 
    number: string,
    phone: string,
    mail: string,
    practice_status: string,
  }[] {
    const items = [
      {
        id: '10086',
        name: 'Nick',
        number: '10086',
        phone: '110',
        mail: '110@outlook.com',
        practice_status: '实习中',
      },
      {
        id: '10086',
        name: 'Nick',
        number: '10086',
        phone: '110',
        mail: '110@outlook.com',
        practice_status: '实习中',
      },
    ];
    return items;
  },
  fetchStudent(): Student {
    return {
      id: '10086',
      name: 'Nick',
      number: '10086',
      grade: '2020',
      phone: '110',
      mail: '110@outlook.com',
      is_practice: true,
      practice_cmp: [],
      has_vitae: true,
      has_proof: false,
      score: -1,
      proof: [''],
      vitae: [''],
    }
  }
}