import { JWT } from "next-auth/jwt";

export type MenuItemT = {
  label: string,
  link: string,
  icon?: string, 
  subItems?: SubMenuItemT[],
}

type SubMenuItemT = {
  label: string,
  link: string,
}

export type FileTreeStructureT = {
  name: string,
  path: string,
  folder: boolean,
  extension?: string,
  items?: FileTreeStructureT[],
}

export type FolderStructureT = {
  name: string,
  link: string,
  parent?: string,
  subFolders: SubFolderT[],
  files: FileT[],
};

type SubFolderT = {
  name: string,
  link: string,
};

type MetadataT = {
  [key: string]: string,
}

export type FileT = {
  uuid: string,
  name: string,
  path: string,
  previewURL: string,
  format: string,
  created: string,
  createdBy: string,
  metadata: MetadataT,
  masks: MaskT[],
  annotations: AnnotationT[],
}

export type ImageT = {
  name: string,
  imageLink: string,
}

type MaskSpecificT = {
  something?: string,
}

type AnnotationSpecificT = {
  something?: string,
}

type MaskT = ImageT & MaskSpecificT;

type AnnotationT = ImageT & AnnotationSpecificT;

export type AnnotationPresetT = {
  id: number,
  color: string,
  factoryID: string,
  presetID: string,
  meta: {
    [key: string]: {
      name: string,
      value: string,
    },
  },
}

export type FormConfigT = {
  title?: string;
  description?: string;
  rows: FormRowT[];
}

type FormRowT = {
  fields: FormFieldT[];
}

type FormFieldT = FormSelectFieldT | FormTextFieldT;

export type FormSelectFieldT = FormFieldBaseT & {
  options: string[];
}

export type FormTextFieldT = FormFieldBaseT;

type FormFieldBaseT = {
  type: string;
  fieldID: string;
  label: string;
  defaultValue?: string;
  description?: string;
}

export interface OAuthToken extends JWT {
  accessToken?: string;
  accessTokenExpires: number;
  refreshToken?: string;
}

export interface OAuthRefreshResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}