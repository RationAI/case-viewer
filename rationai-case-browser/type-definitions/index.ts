export type MenuItem = {
  label: string,
  link: string,
  subItems?: SubMenuItem[],
}

type SubMenuItem = {
  label: string,
  link: string,
}