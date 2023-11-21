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

export type File = {
  uuid: string,
  name: string,
  path: string,
  previewURL: string,
  format: string,
  created: string,
  createdBy: string,
  metadata: Metadata,
  masks: Mask[],
  annotations: Annotation[],
}

export type ImageType = {
  name: string,
  imageLink: string,
}

type MaskSpecific = {
  something?: string,
}

type AnnotationSpecific = {
  something?: string,
}

type Mask = ImageType & MaskSpecific;

type Annotation = ImageType & AnnotationSpecific;
