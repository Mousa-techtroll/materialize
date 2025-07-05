'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// Type Imports
import type { ChildrenType, SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getSystemModeBrowser } from '@/utils/browserHelpers'

type Props = ChildrenType

const Layout = (props: Props) => {
  const { children } = props
  const params = useParams<{ lang: Locale }>()

  const [systemMode, setSystemMode] = useState<SystemMode>('light')

  useEffect(() => {
    setSystemMode(getSystemModeBrowser())
  }, [])

  const direction = i18n.langDirection[params.lang]

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
