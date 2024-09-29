import { Layout } from 'antd'
import type { FC, PropsWithChildren } from 'react'

import styles from './content.module.css'

const Content: FC<PropsWithChildren> = ({ children }) => (
  <Layout.Content className={styles['content']}>{children}</Layout.Content>
)

export default Content
