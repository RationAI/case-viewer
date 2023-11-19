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

export type FileTreeStructure = {
  name: string,
  path: string,
  folder: boolean,
  extension?: string,
  items?: FileTreeStructure[],
}

export type FolderStructure = {
  name: string,
  link: string,
  parent?: string,
  subFolders: SubFolder[],
  files: File[],
};

type SubFolder = {
  name: string,
  link: string,
};

type Metadata = {
  [key: string]: string,
}

type File = {
  uuid: string,
  path: string,
  format: string,
  created: string,
  createdBy: string,
  metadata: Metadata,
  masks: Mask[],
  annotations: Annotation[],
}

type Mask = {
  name: string,
  imageLink: string,
}

type Annotation = {
  name: string,
  imageLink: string,
}
