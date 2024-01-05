import { Teachers } from "@/global/type";

export default {
  fetchTeacher(): Teachers {
    const teachers: Teachers = [
      {
        id: '10086',
        name: 'Bob',
        number: '20044231',
        phone: '124208',
        mail: '124208@outlook.jp',
      },
      {
        id: '10086',
        name: 'Bob',
        number: '20044231',
        phone: '124208',
        mail: '124208@outlook.jp',
      },
      {
        id: '10086',
        name: 'Bob',
        number: '20044231',
        phone: '124208',
        mail: '124208@outlook.jp',
      }
    ];
    return teachers;
  }
}