import { AppConfigT } from "@/type-definitions";

export const createConfig = async (project: string | null) => {
  const defaultConfig: AppConfigT = (await import('../../config/config.json'))
  let finalConfig: AppConfigT;
  
  if (project) {
    const projectConfig: AppConfigT = (await import(`../../config/${project}.config.json`))
    finalConfig = {
      ...defaultConfig,
      ...projectConfig,
    }
  } else {
    finalConfig = defaultConfig
  }
  
  return finalConfig
}

export const getConfig = () => {
  const configSerialized = process.env.NEXT_APP_CONFIG
  const configJson = configSerialized ? (JSON.parse(configSerialized) as AppConfigT) : {}
  
  return configJson
}

export const getIdentifierSeparator = () => {
  const config = getConfig()
  return config.local_id_separator || "[\\s\\S]*"
}

export const getHierarchySpec = () => {
  const config = getConfig()
  return config.hierarchy_spec || []
}

export const getSlideMaskSeparator = () => {
  const config = getConfig()
  return config.slide_mask_separator!
}