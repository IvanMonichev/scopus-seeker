import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/app'
import ruRU from 'antd/locale/ru_RU'
import { designTokens } from '@/constants/design-tokenks'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={ruRU} theme={designTokens}>
      <App />
    </ConfigProvider>
  </StrictMode>
)
