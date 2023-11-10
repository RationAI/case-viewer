export type MenuItem = {
  label: string,
  link: string,
  subItems?: SubMenuItem[],
}

export type UserMenu = {
  items: SubMenuItem[],
}

type SubMenuItem = {
  label: string,
  link: string,
}