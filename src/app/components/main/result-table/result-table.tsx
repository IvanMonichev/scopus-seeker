import { FC, useEffect, useState } from 'react'
import { Table, Pagination, Tag } from 'antd'
import { useData } from '@/hooks/use-data'

import styles from './result-table.module.css'
import { parseSearchTerms } from '@/app/components/main/result-table/result-table.service'
import { fetchScienceDirectData } from '@/services/scopus-api'
import Link from 'antd/es/typography/Link'
import { IAuthors, IEntry } from '@/types/search-results'

const SearchResultsTable: FC = () => {
  const { data, setData } = useData()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  useEffect(() => {
    if (data) {
      setPageSize(Number(data['search-results']['opensearch:itemsPerPage']))
    }
  }, [data])

  if (!data) {
    return undefined
  }

  const results = data['search-results']
  const totalItems = parseInt(results['opensearch:totalResults'], 10)

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true)
    try {
      const query = results['opensearch:Query']['@searchTerms']
      const result = await fetchScienceDirectData(query, page, pageSize)
      setData(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    await fetchData(page, pageSize)
  }

  // Определяем данные для отображения на текущей странице

  const columns = [
    {
      title: 'Доступ',
      dataIndex: 'openaccess',
      key: 'openaccess',
      render: (text: boolean) => (text ? <Tag color='green'>Октрыто</Tag> : <Tag color='red'>Закрыто</Tag>) // Изменено на русский
    },
    {
      title: 'Название статьи',
      dataIndex: 'dc:title',
      key: 'dc:title',
      render: (title: string, record: IEntry) => (
        <Link target='_blank' href={record.link[1]['@href']}>
          {title}
        </Link>
      )
    },
    {
      title: 'Авторы',
      dataIndex: 'authors.author',
      key: 'authors.author',
      render: (_: IAuthors, record: IEntry) => {
        const authors = record?.authors?.author

        if (Array.isArray(authors)) {
          return authors.map((author) => author['$']).join(', ')
        }

        return ''
      }
    },
    {
      title: 'Название публикации',
      dataIndex: 'prism:publicationName',
      key: 'prism:publicationName'
    },
    {
      title: 'Том',
      dataIndex: 'prism:volume',
      key: 'prism:volume'
    },
    {
      title: 'Дата выпуска',
      dataIndex: 'prism:coverDate',
      key: 'prism:coverDate'
    },
    {
      title: 'DOI',
      dataIndex: 'prism:doi',
      key: 'prism:doi'
    },
    {
      title: 'PII',
      dataIndex: 'pii',
      key: 'pii'
    }
  ]

  const searchTerms = parseSearchTerms(results['opensearch:Query']['@searchTerms'])

  return (
    <>
      <div className={styles['info']}>
        <h2 className={styles['title']}>Результаты поиска</h2>
        <p className={styles['p-description']}>
          <span className={styles['accent']}>Кол-во результатов</span>: {results['opensearch:totalResults']}
        </p>
        <p className={styles['p-description']}>
          <span className={styles['accent']}>Поисковые слова</span>: {searchTerms}
        </p>
      </div>
      <Pagination
        className={styles['pagination']}
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showQuickJumper={true}
        hideOnSinglePage={true}
        size='small'
        disabled={loading}
      />
      <Table
        className={styles['table']}
        dataSource={results.entry}
        columns={columns}
        pagination={false}
        rowKey='dc:identifier' // Используйте уникальный идентификатор для строк
        loading={loading}
        sticky={true}
      />
    </>
  )
}

export default SearchResultsTable
