import type { FC } from 'react'
import { Flex, Layout, Typography } from 'antd'

import styles from './header.module.css'

const Header: FC = () => (
  <Layout.Header className={styles['header']}>
    <Flex align='center' justify='space-between' className={styles['inner']}>
      <h1 className={styles['h1-title']}>
        <span className={styles['accent']}>Scopus</span> Seeker
      </h1>
      <Typography.Text>
        ИТМО, ФПИиКТ, Веб-технологии, <span className={styles['accent']}>Иван Моничев</span>
      </Typography.Text>
    </Flex>
  </Layout.Header>
)

export default Header
