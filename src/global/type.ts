import { ChangeEvent, ReactNode } from "react"

/**
 * 页面样式渲染类型
 */
export interface NavItem {
  label: string
  href: string
  active?: boolean
}

export interface FormItem {
  label: string // 表单项标签
  type: 'input' | 'textarea' | 'select' | 'checked' | 'file' // 表单项类型
  isPassword?: boolean // 是否密码
  selectOpt?: { label: string, value: string | number }[] // 选择类型值
  checkedDefault?: boolean // 选中类型默认是否选中
  fileTypeRestricted?: string[] // 文件类型限制
  fileTackleFunction?: (event: ChangeEvent<HTMLInputElement>) => void // 文件抓取函数
}

export interface TableColumn {
  title: string
  dataIndex: string
  key: string,
  hidden?: boolean
  render?: (...args: any) => ReactNode
}

export type NavItems = Array<NavItem>;
export type FormItems = Array<FormItem>;
export type TableColumns = Array<TableColumn>;
export type TableDataSource = Array<{ [key: string]: React.Key | string | number | undefined }>

/**
 * 后台处理类型
 */
export type GlobalStateVariableType = string | number | boolean | null | undefined;

/**
 * 数据整理类型
 */
export interface Profile {
  id: string // 编号
  name: string // 登录名
  password: string // 密码
  role: number // 身份 0-管理员 1-学生 2-老师 3-企业
  role_id: string // 对应身份编号
}

export interface Student {
  id: string // 编号
  name: string // 姓名
  number: string // 学号
  grade: string // 年级
  phone: string // 联系电话
  mail: string // 联系邮箱
  performence: string // 专业方向
  is_practice: Uint8Array // 是否处于实习中
  practice_cmp: string[] // 历史实习公司
  has_vitae: Uint8Array // 是否存在个人简历
  has_proof: Uint8Array // 是否存在实习凭证
  score?: number // 实习分数
  proof?: Uint8Array // 实习凭证 PDF
  vitae?: Uint8Array // 个人简历 PDF
}

export interface Teacher {
  id: string // 编号
  name: string // 姓名
  number: string // 工号
  phone: string // 联系电话
  mail: string // 联系邮箱
}

export interface StudentTeacherMap {
  id: string // 编号
  student_id: string // 学生编号
  teacher_id: string // 教师编号
}

export interface Company {
  id: string // 编号
  name: string // 企业名称
  phone: string // 联系电话
  mail: string // 联系邮箱
  license: string // 营业执照
}

export interface StudentPracticeExperience {
  id: string // 编号
  company_id: string // 企业编号
  company_name?: string // 企业名称
  student_id: string // 学生编号
  start: string // 就职时间
  end: string // 离职时间
}

export interface AnnexHistory {
  id: string // 编号
  type: 'resume' | 'practive-document' // 类型
  base64code: string // 文件base64编码
  created: string // 文件上传时间
}

export interface Job {
  id: string // 编号
  company_id: string // 企业编号
  company_name?: string // 企业名称
  name: string // 岗位名称
  salary: string // 薪资
  descript: string // 描述
}

export interface JobAudit {
  id: string // 编号
  student_id: string // 学生编号
  company_id: string // 企业编号
  company_name?: string //
  job_id: string // 岗位编号
  job_name?: string //
  salary?: string //
  progress: string // 状态
  feedback?: string // 企业反馈
  resume?: Buffer // 简历
  descript?: string // 
  created?: string
}

export interface Notification {
  id: string // 编号
  title: string // 标题
  simple_descript?: string // 简易描述
  descript?: string // 描述
  created?: string
}

export interface Announcement {
  id: string // 编号
  title: string
  descript: string
  created?: string
}

export interface StudentWithJob extends JobAudit {
  student_name: string
  job_name: string
}

export type Students = Array<Student>;
export type Teachers = Array<Teacher>;
export type Companies = Array<Company>;
export type StudentPracticeExperiencies = Array<StudentPracticeExperience>;
export type AnnexHistories = Array<AnnexHistory>;
export type Jobs = Array<Job>;
export type JobAudits = Array<JobAudit>;
export type Notifications = Array<Notification>;
export type Announcements = Array<Announcement>;
export type StudentsWithJob = Array<StudentWithJob>;