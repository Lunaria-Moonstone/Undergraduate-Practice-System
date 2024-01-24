import { Notifications } from "@/global/type";

export default {
  fetchNotifications(): Notifications {
    const items: Notifications = [
      {
        id: '10086',
        title: '新的投递进度',
        simple_descript: '您在国家安全局投递的简历有新进展了',
        descript: '您在国家安全局投递的简历当前的状态为已被拒绝'
      },
      {
        id: '10086',
        title: '新的投递进度',
        simple_descript: '您在国家安全局投递的简历有新进展了',
        descript: '您在国家安全局投递的简历当前的状态为已读'
      },
    ];
    return items;
  },
  fetchAnnouncements() {
    
  }
}