export interface NavItem {
  label: string
  href: string
  active?: boolean
}

export type NavItems = Array<NavItem>;