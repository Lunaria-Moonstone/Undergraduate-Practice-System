import axios from "axios";

const require_route = '/authorized/signin/api/';

export default {
  // authorize(username: string, password: string): number {
  //   if (username === 'admin' && password === '123456') return 0;
  //   if (username === 'student' && password === '123456') return 1;
  //   if (username === 'teacher' && password === '123456') return 2;
  //   if (username === 'company' && password === '123456') return 3;
  //   return -1;
  // },
  async authorize(name: string, password: string): Promise<number> {
    let result = (await axios({
      url: require_route,
      method: 'post',
      data: { name, password }
    })).data;
    console.log(result);

    if (!result['ok'] || (result['ok'] && result['results'].length === 0)) {
      return -1;
    }
    let role = (Buffer.from(result['results'][0].role))[0];
    
    return role;
  }
}