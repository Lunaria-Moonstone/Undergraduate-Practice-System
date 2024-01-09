import { Jobs } from "@/global/type";

export default {
  fetchJobs(): Jobs {
    const jobs: Jobs = [
      { id: '10086', company_id: '10086', name: '外卖小哥', salary: '1800', descript: '建设中国梦' },
      { id: '10086', company_id: '10086', name: '外卖小哥', salary: '1800', descript: '建设中国梦' },
      { id: '10086', company_id: '10086', name: '外卖小哥', salary: '1800', descript: '建设中国梦' }
    ];
    return jobs;
  }
}