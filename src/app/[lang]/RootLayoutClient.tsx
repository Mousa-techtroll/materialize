'use client'

// Next Imports
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType, SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getSystemModeBrowser } from '@/utils/browserHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

const RootLayoutClient = (props: ChildrenType) => {
  const { children } = props
  const params = useParams<{ lang: Locale }>()

  const [systemMode, setSystemMode] = useState<SystemMode>('light')

  useEffect(() => {
    setSystemMode(getSystemModeBrowser())
  }, [])

  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper lang={params.lang}>
      <html id='__next' lang={params.lang} dir={direction} suppressHydrationWarning>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
          {children}
        </body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayoutClient
