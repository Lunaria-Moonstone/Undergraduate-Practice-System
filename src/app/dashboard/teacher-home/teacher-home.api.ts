import {  Announcements, Notification, Notifications } from "@/global/type";
import axios from "axios";

interface SimpleStudent {
  name: string; 
  number: string; 
  phone: string; 
  mail: string;
}

export default {
  async fetchNotifications(): Promise<Notifications> {
    const items: Notifications = (await axios({
      url: '/dashboard/notification-api',
      method: 'get',
    })).data.results as Notifications;
    // console.log(items);
    return items;
  },
  async fetchNotification(id: string): Promise<Notification> {
    const item: Notification = (await axios({
      url: '/dashboard/notification-api',
      method: 'get',
      params: { id },
    })).data.results[0] as Notification;
    return item;
  },
  async fetchAnnouncements(): Promise<Announcements> {
    const items: Announcements = (await axios({
      url: '/dashboard/announcement-api',
      method: 'get',
    })).data.results as Announcements;
    return items;
  },
  async fetchTeacherInfo(): Promise<SimpleStudent> {
    const item: SimpleStudent = (await axios({
      url: '/dashboard/teacher-home/api',
      method: 'get',
    })).data['results'][0] as SimpleStudent;
    return item;
  }
}