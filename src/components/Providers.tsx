'use client'

// React Imports
import { useEffect, useState } from 'react'

// Type Imports
import type { ChildrenType, Direction, Mode, SystemMode } from '@core/types'

// Context Imports
import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import ReduxProvider from '@/redux-store/ReduxProvider'

// Styled Component Imports
import AppReactToastify from '@/libs/styles/AppReactToastify'

// Util Imports
import {
  getModeBrowser,
  getSettingsFromCookieBrowser,
  getSystemModeBrowser
} from '@/utils/browserHelpers'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = (props: Props) => {
  const { children, direction } = props

  const [mode, setMode] = useState<Mode>('light')
  const [systemMode, setSystemMode] = useState<SystemMode>('light')
  const [settingsCookie, setSettingsCookie] = useState<any>(null)

  useEffect(() => {
    setMode(getModeBrowser())
    setSystemMode(getSystemModeBrowser())
    setSettingsCookie(getSettingsFromCookieBrowser())
  }, [])

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
          <ThemeProvider direction={direction} systemMode={systemMode}>
            <ReduxProvider>{children}</ReduxProvider>
            <AppReactToastify direction={direction} hideProgressBar />
          </ThemeProvider>
        </SettingsProvider>
      </VerticalNavProvider>
    </NextAuthProvider>
  )
}

export default Providers
