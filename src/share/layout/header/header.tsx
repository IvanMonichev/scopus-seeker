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
        ИТМО, ФПИиКТ, Веб-технологии,{' '}
        <Typography.Link target='_blank' href='https://isu.ifmo.ru/person/466757' className={styles['accent']}>
          Иван Моничев
        </Typography.Link>
        <Typography.Text>{__APP_VERSION__}</Typography.Text>
      </Typography.Text>
    </Flex>
  </Layout.Header>
)

export default Header
