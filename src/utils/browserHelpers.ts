import themeConfig from '@configs/themeConfig'
import type { Mode, SystemMode } from '@core/types'
import type { Settings } from '@core/contexts/settingsContext'
import type { Locale } from '@configs/i18n'

const getCookieValue = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))

  return match ? decodeURIComponent(match.split('=')[1]) : undefined
}

export const getSettingsFromCookieBrowser = (): Settings => {
  try {
    const cookie = getCookieValue(themeConfig.settingsCookieName) || '{}'
    return JSON.parse(cookie)
  } catch {
    return {} as Settings
  }
}

export const getModeBrowser = (): Mode => {
  const settingsCookie = getSettingsFromCookieBrowser()
  return (settingsCookie.mode || themeConfig.mode) as Mode
}

export const getSystemModeBrowser = (): SystemMode => {
  const mode = getModeBrowser()
  const colorPref = (getCookieValue('colorPref') || 'light') as SystemMode
  return (mode === 'system' ? colorPref : mode) || 'light'
}

export const getServerModeBrowser = (): Mode => {
  const mode = getModeBrowser()
  const systemMode = getSystemModeBrowser()
  return (mode === 'system' ? systemMode : mode) as Mode
}

export const getSkinBrowser = (): string => {
  const settingsCookie = getSettingsFromCookieBrowser()
  return settingsCookie.skin || 'default'
}

export const getDictionaryBrowser = async (locale: Locale) => {
  return (await import(`@/data/dictionaries/${locale}.json`)).default
}
