import { ThemeConfig } from 'antd'

export const designTokens: ThemeConfig = {
  token: {
    colorPrimaryHover: '#e9711c',
    colorPrimary: '#e9711c'
  },
  components: {
    Layout: {
      headerBg: '#f5f5f5'
    },
    Input: {
      activeBorderColor: '#e9711c',
      inputFontSize: 18
    },
    Button: {
      contentFontSize: 18,
      paddingBlock: 18
    },
    Typography: {
      colorLink: '#0c7dbb'
    }
  }
}
