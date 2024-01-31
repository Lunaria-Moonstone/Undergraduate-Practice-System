import { Announcements } from "@/global/type";

export default {
  fetchAnnouncements(): Announcements {
    const items: Announcements = [
      {
        id: '10086',
        title: '海天酱油厂入驻系统',
        descript: '海天酱油厂入驻系统',
      }
    ];
    return items;
  }
}