import { FC, Key, useEffect, useState } from 'react'
import { Table, Pagination, Tag, TableProps } from 'antd'
import { useData } from '@/hooks/use-data'

import styles from './result-table.module.css'
import { parseSearchTerms } from '@/app/components/main/result-table/result-table.service'
import { fetchScienceDirectData } from '@/services/scopus-api'
import Link from 'antd/es/typography/Link'
import { IAuthors, IEntry } from '@/types/search-results'
import { PAGE_SIZE } from '@/constants/config'

interface DataType extends IEntry {
  key: string
}

const SearchResultsTable: FC = () => {
  const { data, setData } = useData()
  const [loading, setLoading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [horizontalScroll, setHorizontalScroll] = useState<number | string>('auto')
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (width < 1550) {
      setHorizontalScroll(1550)
    }
  }, [width])

  if (!data) {
    return undefined
  }

  const results = data['search-results']
  const totalItems = parseInt(results['opensearch:totalResults'], 10)

  const fetchData = async (offset: number, pageSize: number) => {
    setLoading(true)
    try {
      const query = results['opensearch:Query']['@searchTerms']
      const result = await fetchScienceDirectData(query, offset, pageSize)
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
    const offset = (page - 1) * pageSize
    await fetchData(offset, pageSize)
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Доступ',
      dataIndex: 'openaccess',
      key: 'openaccess',
      render: (openaccess: boolean) => (openaccess ? <Tag color='green'>Открыто</Tag> : <Tag color='red'>Закрыто</Tag>),
      sorter: (a: IEntry, b: IEntry) => Number(a.openaccess) - Number(b.openaccess),
      filters: [
        { text: 'Открыто', value: true },
        { text: 'Закрыто', value: false }
      ],
      onFilter: (value: boolean | Key, record: DataType) => value === record['openaccess']
    },
    {
      title: 'Название статьи',
      dataIndex: 'dc:title',
      key: 'dc:title',
      render: (title: string, record: IEntry) => (
        <Link target='_blank' href={record.link[1]['@href']}>
          {title}
        </Link>
      ),
      sorter: (a: IEntry, b: IEntry) => a['dc:title'].localeCompare(b['dc:title'])
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
      key: 'prism:coverDate',
      sorter: (a: IEntry, b: IEntry) =>
        new Date(a['prism:coverDate']).getTime() - new Date(b['prism:coverDate']).getTime()
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

  const tableData = results.entry.map<DataType>((item, index) => ({ ...item, key: index.toString() }))

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
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        showQuickJumper={true}
        hideOnSinglePage={true}
        disabled={loading}
      />
      <Table
        className={styles['table']}
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowKey='dc:identifier'
        loading={loading}
        sticky={true}
        showSorterTooltip={{ target: 'sorter-icon' }}
        scroll={{ x: horizontalScroll }}
      />
    </>
  )
}

export default SearchResultsTable
