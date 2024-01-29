import { Job, Jobs } from "@/global/type";

export default {
  fetchJobs(): Jobs {
    const items: Jobs = [
      {
        id: '10086',
        company_id: '10086',
        name: '保安',
        salary: '10000',
        descript: '碧桂园五星上将',
      }
    ];
    return items;
  },
  fetchJob(): Job {
    return {
      id: '10086',
      company_id: '10086',
      name: '保安',
      salary: '10000',
      descript: '碧桂园五星上将'
    }
  }
}