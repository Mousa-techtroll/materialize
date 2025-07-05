"use client"

// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import type { ChildrenType, Mode, SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import Customizer from '@core/components/customizer'
import ScrollToTop from '@core/components/scroll-to-top'
import AuthGuard from '@/hocs/AuthGuard'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getDictionaryBrowser, getModeBrowser, getSystemModeBrowser } from '@/utils/browserHelpers'

const Layout = (props: ChildrenType) => {
  const { children } = props
  const params = useParams<{ lang: Locale }>()

  const [dictionary, setDictionary] = useState<any>()
  const [mode, setMode] = useState<Mode>('light')
  const [systemMode, setSystemMode] = useState<SystemMode>('light')

  useEffect(() => {
    getDictionaryBrowser(params.lang as Locale).then(setDictionary)
    setMode(getModeBrowser())
    setSystemMode(getSystemModeBrowser())
  }, [params.lang])

  const direction = i18n.langDirection[params.lang]

  if (!dictionary) return null

  return (
    <Providers direction={direction}>
      <AuthGuard locale={params.lang}>
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <VerticalLayout
              navigation={<Navigation dictionary={dictionary} mode={mode} />}
              navbar={<Navbar />}
              footer={<VerticalFooter />}
            >
              {children}
            </VerticalLayout>
          }
          horizontalLayout={
            <HorizontalLayout header={<Header dictionary={dictionary} />} footer={<HorizontalFooter />}>
              {children}
            </HorizontalLayout>
          }
        />
        <ScrollToTop className='mui-fixed'>
          <Button
            variant='contained'
            className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
          >
            <i className='ri-arrow-up-line' />
          </Button>
        </ScrollToTop>
        <Customizer dir={direction} />
      </AuthGuard>
    </Providers>
  )
}

export default Layout
