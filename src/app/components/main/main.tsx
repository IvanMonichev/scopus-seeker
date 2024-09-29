import { Layout } from 'antd'
import type { FC } from 'react'

import Header from '@/share/layout/header/header'
import Search from '@/app/components/main/search/search'
import Content from '@/share/layout/content/content'

const Main: FC = () => (
  <Layout>
    <Header />
    <Content>
      <Search />
    </Content>
    <Layout.Footer>Footer</Layout.Footer>
  </Layout>
)

export default Main
