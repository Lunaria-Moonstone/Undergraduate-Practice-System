/**
 * 页面样式渲染类型
 */
export interface NavItem {
  label: string
  href: string
  active?: boolean
}

export type NavItems = Array<NavItem>;

/**
 * 数据整理类型
 */
export interface Student {
  id: string // 编号
  name: string // 姓名
  number: string // 学号
  grade: string // 年级
  phone: string // 联系电话
  mail: string // 联系邮箱
  is_practice: boolean // 是否处于实习中
  practice_cmp: string[] // 历史实习公司
  has_vitae: boolean // 是否存在个人简历
  has_proof: boolean // 是否存在实习凭证
  score?: number // 实习分数
  proof?: string[] // 实习凭证 PDF
  vitae?: string[] // 个人简历 PDF
}

export interface Teacher {
  id: string // 编号
  name: string // 姓名
  number: string // 工号
  phone: string // 联系电话
  mail: string // 联系邮箱
}

export interface Company {
  id: string // 编号
  name: string // 企业名称
  phone: string // 联系电话
  mail: string // 联系邮箱
  license: string // 营业执照
}

export type Students = Array<Student>;
export type Teachers = Array<Teacher>;
export type Companies = Array<Company>;