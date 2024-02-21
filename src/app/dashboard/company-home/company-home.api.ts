import axios from "axios";

import { Notification, Notifications } from "@/global/type";

const require_route = '/dashboard/company-home/api/';

export default {
  async fetchNotifications(): Promise<Notifications> {
    const items: Notifications = (await axios({
      url: require_route,
      method: 'get'
    })).data['results'] as Notifications;
    return items;
  },
  async fetchNotification(id: string): Promise<Notification> {
    let item: Notification = (await axios({
      url: require_route,
      method: 'get',
      params: { id },
    })).data['results'][0] as Notification;
    return item;
  },
  async delNotification(id: string): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'delete',
      params: { id }
    });
    return results.data['ok'];
  }
}