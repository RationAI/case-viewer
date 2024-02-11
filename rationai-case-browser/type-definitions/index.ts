import { JWT } from "next-auth/jwt";

export type AppConfigT = {
  project?: string,
  local_id_separator?: string,
  local_id_hint?: string,
  hierarchy_spec?: string[],
  
  searchKeys?: string[],
}

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

export type TableStructureT = {
  name: string,
  parent?: string,
  cases: TableCaseT[],
  slides: TableSlideT[],
};

type TableCaseT = {
  name: string,
  desc?: string,
  link: string,
};

type MetadataT = {
  [key: string]: string,
}

export type TableSlideT = {
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