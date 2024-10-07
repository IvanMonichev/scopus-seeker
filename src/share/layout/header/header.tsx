import type { FC } from 'react'
import { Flex, Typography } from 'antd'

import styles from './header.module.css'

const Header: FC = () => (
  <header className={styles['header']}>
    <Flex align='flex-end' gap={5}>
      <h1 className={styles['h1-title']}>
        <span className={styles['accent']}>Scopus</span> Seeker
      </h1>
      <Typography.Text>
        <Typography.Text code={true}>{__APP_VERSION__}</Typography.Text>
      </Typography.Text>
    </Flex>
    <Typography.Text>
      ИТМО, ФПИиКТ, Веб-технологии,{' '}
      <Typography.Link target='_blank' href='https://isu.ifmo.ru/person/466757' className={styles['accent']}>
        Иван Моничев
      </Typography.Link>
    </Typography.Text>
  </header>
)

export default Header