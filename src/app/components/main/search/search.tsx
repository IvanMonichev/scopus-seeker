import { FC, useState } from 'react'
import { Button, DatePicker, Flex, Form, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Input from 'antd/es/input/Input'
import { SearchFormLabel, SearchFormName } from '@/constants/search-form'

import styles from './search.module.css'
import { fetchScienceDirectData } from '@/services/scopus-api'
import { SearchOutlined } from '@ant-design/icons'
import { ISearchForm } from '@/types/search-form'
import { useData } from '@/hooks/use-data'

const Search: FC = () => {
  const { setData } = useData()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [form] = useForm<ISearchForm>()

  const handleSearchFinish = async () => {
    const fields = form.getFieldsValue()
    const { query, dateRange } = fields

    const formattedDateRange = dateRange ? `${dateRange[0].format('YYYY')}-${dateRange[1].format('YYYY')}` : undefined
    try {
      setLoading(true)
      const result = await fetchScienceDirectData(query, formattedDateRange)
      console.log(result)
      setData(result)
    } catch (err: any) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles['container']}>
      <Form form={form} layout='vertical' onFinish={handleSearchFinish} disabled={loading}>
        <Form.Item name={SearchFormName.Query}>
          <Flex gap={5} align='center'>
            <Input placeholder={'Введите данные для запроса'} />
            <Button type='primary' icon={<SearchOutlined />} htmlType='submit' loading={loading}>
              Найти
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item name={SearchFormName.DateRange} label={SearchFormLabel.DateRange} layout='horizontal'>
          <DatePicker.RangePicker picker='year' size='small' />
        </Form.Item>
      </Form>
      {error && (
        <div>
          <h2>ScienceDirect Search Error</h2>
          <Typography.Text code={true}>{error}</Typography.Text>
        </div>
      )}
    </div>
  )
}

export default Search
