import { Companies, StudentPracticeExperiencies } from "@/global/type"

export default {
  fetchExperience(): StudentPracticeExperiencies {
    const items: StudentPracticeExperiencies = [
      { id: '10086', company_id: '10086', start: '23-1-8', end: '24-1-8' },
    ];

    return items;
  },
  fetchCompanies(): Companies {
    const items: Companies = [
      { id: '10086', name: '国家安全局', phone: '110', mail: '110@outlook.jp', license: '00' }
    ]
    return items;
  }
}