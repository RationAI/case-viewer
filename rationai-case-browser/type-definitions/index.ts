export type MenuItem = {
  label: string,
  link: string,
  icon?: string, 
  subItems?: SubMenuItem[],
}

type SubMenuItem = {
  label: string,
  link: string,
}