import { Companies } from "@/global/type";

export default {
  fetchCompanies(): Companies {
    let companies: Companies = [
      {
        id: '10086',
        name: '国家安全局',
        phone: '110',
        mail: '110@outlook.jp',
        license: 'l-o-o-l'
      },
      {
        id: '10086',
        name: '国家安全局',
        phone: '110',
        mail: '110@outlook.jp',
        license: 'l-o-o-l'
      },
      {
        id: '10086',
        name: '国家安全局',
        phone: '110',
        mail: '110@outlook.jp',
        license: 'l-o-o-l'
      },
      {
        id: '10086',
        name: '国家安全局',
        phone: '110',
        mail: '110@outlook.jp',
        license: 'l-o-o-l'
      },
    ]
    return companies;
  }
}