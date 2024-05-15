import { AppConfigT } from '@/type-definitions';

export const createConfig = async (project: string | null) => {
  const defaultConfig: AppConfigT = (await import('../../config/config.json'))
    .default;
  let finalConfig: AppConfigT;

  if (project) {
    const projectConfig: AppConfigT = (
      await import(`../../config/${project}.config.json`)
    ).default;
    finalConfig = {
      ...defaultConfig,
      ...projectConfig,
    };
  } else {
    finalConfig = defaultConfig;
  }

  return finalConfig;
};

export const getConfig = () => {
  const configSerialized = process.env.NEXT_PUBLIC_APP_CONFIG;
  const configJson = configSerialized
    ? (JSON.parse(configSerialized) as AppConfigT)
    : {};

  return configJson;
};

export const getIdentifierSeparator = () => {
  const config = getConfig();
  return config.local_id_separator || '[\\s\\S]*';
};

export const getHierarchySpec = () => {
  const config = getConfig();
  return config.hierarchy_spec || [];
};

export const getHierarchyNameOverrides = () => {
  const config = getConfig();
  return config.hierarchy_key_overrides || {};
};

export const getSlideMaskSeparator = () => {
  const config = getConfig();
  return config.slide_mask_separator!;
};

export const getSearchKeys = () => {
  const config = getConfig();
  console.log(config);
  return config.search_keys || [];
};

export const getSettings = () => {
  const config = getConfig();
  return config.settings || {};
};
