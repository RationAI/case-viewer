import { HierarchyNameOverrides } from "@/EmpationAPI/src/v3/extensions/case-explorer";
import { CaseH } from "@/EmpationAPI/src/v3/extensions/types/case-h";
import { Case } from "@/EmpationAPI/src/v3/root/types/case";
import { Slide } from "@/EmpationAPI/src/v3/root/types/slide";
import { JWT } from "next-auth/jwt";

export type AppConfigT = {
  project?: string,
  local_id_separator?: string,
  local_id_hint?: string,
  hierarchy_spec?: string[],
  hierarchy_key_overrides?: HierarchyNameOverrides,
  slide_mask_separator?: string,
  
  search_keys?: string[],

  settings?: object,
}

export type MenuItemT = {
  label: string,
  link: string,
  icon?: string, 
  subItems?: MenuItemT[],
  external?: boolean,
  shallowLink?: boolean,
}

export type TableStructureT = {
  parent?: string,
  folders?: TableFolderRowT[],
  cases?: (Case | CaseH)[];
  mergeCases?: boolean,
};

export type SlideRowT = {
  slide: Slide,
  caseObj: CaseH,
  jobs: JobState[],
}

type TableFolderRowT = {
  name: string,
  link: string,
}

export type Visualization = {
  shaders: object,
  name: string,
  protocol: string,
}

export type VisualizationConfig = {
  params?: object,
  data: string[],
  background?: object,
  visualizations: Visualization[],
  plugins?: object,
};

export type ImageT = {
  name: string,
  imageLink: string,
}

export type AnnotationPresetT = {
  id: string,
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

export type FormFieldT = FormSelectFieldT | FormTextFieldT | FormNumberFieldT;

export type FormSelectFieldT = FormFieldBaseT & {
  options: string[];
}

export type FormTextFieldT = FormFieldBaseT;

export type FormNumberFieldT = FormFieldBaseT & {
  minValue?: string;
  maxValue?: string;
  step?: string;
};

type FormFieldBaseT = {
  type: string;
  fieldID: string;
  label: string;
  defaultValue?: string;
  description?: string;
}

export type JobState = {
  caseId: string,
  appId: string,
  id: string,
  status: string,
  inputs: string[],
  outputs: string[],
  visualization?: Visualization,
  background?: object,
  name?: string,
  description?: string,
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