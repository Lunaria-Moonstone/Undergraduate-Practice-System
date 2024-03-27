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
  },
  async addNotification(data: { [key: string]: string }): Promise<boolean> {
    const result = (await axios({
      url: '/dashboard/notification-api',
      method: 'post',
      data,
    }));
    console.log(result);
    return result.data['ok'];
  },
  async fetchPracticeRate() {
    const result = (await axios({
      url: '/dashboard/teacher-home/api/practice-rate',
      method: 'get',
    })).data['results'][0] as { [key: string]: number };
    console.log(result);
    return String(result['ratio'] * 100) + '%';
  },
  async fetchIsOkRate() {
    const result = (await axios({
      url: '/dashboard/teacher-home/api/is-ok-rate',
      method: 'get',
    })).data['results'][0] as { [key: string]: number };
    return String(result['ratio'] * 100) + '%';
  }
}