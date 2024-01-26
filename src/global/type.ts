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
  type: 'input' | 'textarea' | 'select' | 'checked' // 表单项类型
  isPassword?: boolean // 是否密码
  selectOpt?: { label: string, value: string | number }[] // 选择类型值
  checkedDefault?: boolean // 选中类型默认是否选中
}

export type NavItems = Array<NavItem>;
export type FormItems = Array<FormItem>;

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

export interface StudentPracticeExperience {
  id: string // 编号
  company_id: string // 企业编号
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
  company_id: string // 企业名称
  name: string // 岗位名称
  salary: string // 薪资
  descript: string // 描述
}

export interface JobAudit {
  id: string // 编号
  student_id: string // 学生编号
  company_id: string // 企业编号
  job_id: string // 岗位编号
  progress: 'unread' | 'reading' | 'invaild' | 'complete' // 状态
  feedback?: string // 企业反馈
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

export type Students = Array<Student>;
export type Teachers = Array<Teacher>;
export type Companies = Array<Company>;
export type StudentPracticeExperiencies = Array<StudentPracticeExperience>;
export type AnnexHistories = Array<AnnexHistory>;
export type Jobs = Array<Job>;
export type JobAudits = Array<JobAudit>;
export type Notifications = Array<Notification>;
export type Announcements = Array<Announcement>;