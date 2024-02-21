import { Announcements, Announcement } from "@/global/type";
import axios from "axios";

const require_route = '/dashboard/admin-home/api/';

export default {
  async fetchAnnouncements(): Promise<Announcements> {
    const items: Announcements = (await axios({
      url: require_route,
      method: 'get'
    })).data['results'] as Announcements;
    return items;
  },
  async fetchAnnouncement(id: string): Promise<Announcement> {
    let item: Announcement = (await axios({
      url: require_route,
      method: 'get',
      params: { id: id },
    })).data['results'][0] as Announcement;
    return item;
  },
  async addAnnouncement(data: { title: string, descript: string }) {
    return (await axios({
      url: require_route,
      method: 'post',
      data,
    }))
  },
  async delAnnouncement(id: string): Promise<boolean> {
    let results = await axios({
      url: require_route,
      method: 'delete',
      params: { id }
    });
    return results.data['ok'];
  }
}