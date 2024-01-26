import {  Announcements, Notification, Notifications } from "@/global/type";

export default {
  fetchNotifications(): Notifications {
    const items: Notifications = [
      {
        id: '10086',
        title: '新的投递进度',
        simple_descript: '您在国家安全局投递的简历有新进展了',
        // descript: '您在国家安全局投递的简历当前的状态为已被拒绝'
      },
      {
        id: '10086',
        title: '新的投递进度',
        simple_descript: '您在国家安全局投递的简历有新进展了',
        // descript: '您在国家安全局投递的简历当前的状态为已读'
      },
    ];
    return items;
  },
  fetchNotification(): Notification {
    return {
      id: '10086',
      title: '新的投递进度',
      descript: '您在国家安全局投递的简历当前的状态为已被拒绝',
      created: '2024/1/24'
    };
  },
  fetchAnnouncements() {
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