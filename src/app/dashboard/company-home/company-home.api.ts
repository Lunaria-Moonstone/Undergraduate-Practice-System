import {  Announcements, Notification, Notifications } from "@/global/type";
import axios from "axios";
import { Company } from "@/global/type";

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
    return items;
  },
  async fetchNotification(id: string): Promise<Notification> {
    const item: Notification = (await axios({
      url: '/dashboard/notification-api',
      method: 'get',
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
  async fetchCompanyInfo(): Promise<Company> {
    const item: Company = (await axios({
      url: '/dashboard/company-home/api',
      method: 'get',
    })).data['results'][0] as Company;
    console.log(item);
    return item;
  }
}