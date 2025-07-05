import type { Metadata } from 'next'
import type { ChildrenType } from '@core/types'

import LayoutClient from './LayoutClient'

export const metadata: Metadata = {
  title: 'Materialize - Material Next.js Admin Template',
  description: 'Materialize - Material Next.js Admin Template'
}

const Layout = (props: ChildrenType) => {
  return <LayoutClient {...props} />
}

export default Layout
