import { Notification, Notifications } from "@/global/type";

export default {
  fetchNotifications(): Notifications {
    const items: Notifications = [
      {
        id: '10086',
        title: '新的简历投递',
        simple_descript: '来自Nick的简历'
      },
    ];
    return items;
  },
  fetchNotification(): Notification {
    return {
      id: '10086',
      title: '新的简历投递',
      descript: '来自Nick的简历投递',
      created: '2024/1/24'
    };
  },
}