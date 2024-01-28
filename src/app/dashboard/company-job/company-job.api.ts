import { Jobs } from "@/global/type";

export default {
  fetchJob(): Jobs {
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
  }
}