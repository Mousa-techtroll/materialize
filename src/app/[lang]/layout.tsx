import type { Metadata } from 'next'
import type { ChildrenType } from '@core/types'

import RootLayoutClient from './RootLayoutClient'

export const metadata: Metadata = {
  title: 'Materialize - Material Next.js Admin Template',
  description: 'Materialize - Material Next.js Admin Template'
}

const Layout = (props: ChildrenType) => {
  return <RootLayoutClient {...props} />
}

export default Layout
