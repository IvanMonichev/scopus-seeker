import { FC, useState } from 'react'
import { Button, Flex, Form, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ISearchResults } from '@/types/search-form'
import Input from 'antd/es/input/Input'
import { SearchFormName } from '@/constants/search-form'

import styles from './search.module.css'
import { IResponseDirectData } from '@/types/response-direct-data'
import { fetchScienceDirectData } from '@/services/scopus-api'
import { SearchOutlined } from '@ant-design/icons'

const Search: FC = () => {
  const [data, setData] = useState<IResponseDirectData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [form] = useForm<ISearchResults>()

  const handleSearchFinish = async () => {
    const search = form.getFieldValue(SearchFormName.Query)

    try {
      setLoading(true)
      const result = await fetchScienceDirectData(search)
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
      </Form>
      {data && (
        <div>
          <h2 className={styles['title']}>Результаты поиска</h2>
          <Typography.Text code={true}>{JSON.stringify(data, null, 2)}</Typography.Text>
        </div>
      )}
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
