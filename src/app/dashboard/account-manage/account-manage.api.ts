import axios from "axios";
import { nanoid } from "nanoid";

export default {
  addAccount(name: string, role: number, role_id: string) {
    axios({
      url: '/dashboard/account-manage/',
      method: 'post',
      data: { id: nanoid(), name: name.length > 20 ? name.slice(0, 20) : name, role, role_id }
    }).catch(err => {
      console.error('addAccount error: ', err);
    });
  }
}