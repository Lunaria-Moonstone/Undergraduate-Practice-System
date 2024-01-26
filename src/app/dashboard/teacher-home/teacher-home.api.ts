import { Announcements } from "@/global/type";

export default {
  fetchAnnouncements(): Announcements {
    const items: Announcements = [
      {
        id: '10086',
        title: '企业海天酱油厂进驻',
        descript: '夹道欢迎新企业海天酱油厂进驻系统！'
      }
    ];
    return items;
  }
}