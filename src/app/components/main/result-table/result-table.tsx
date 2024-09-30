import { FC, useEffect, useState } from 'react'
import { Table, Pagination } from 'antd'
import { IEntry } from '@/types/search-results'
import { useData } from '@/hooks/use-data'

import styles from './result-table.module.css'
import { parseSearchTerms } from '@/app/components/main/result-table/result-table.service'

const HEADER_HEIGHT = 50 // Пример высоты заголовка в пикселях
const PADDING = 20 // Пример отступов, которые нужно учест

const SearchResultsTable: FC = () => {
  const { data } = useData()
  const [tableHeight, setTableHeight] = useState(window.innerHeight - HEADER_HEIGHT - PADDING)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Функция для обновления высоты таблицы
    const updateTableHeight = () => {
      setTableHeight(window.innerHeight - HEADER_HEIGHT - PADDING)
    }

    // Обновление высоты при изменении размера окна
    window.addEventListener('resize', updateTableHeight)

    // Удаляем слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', updateTableHeight)
    }
  }, [])

  if (!data) {
    return undefined
  }

  const results = data['search-results']
  const itemsPerPage = parseInt(results['opensearch:itemsPerPage'], 10)
  const totalItems = parseInt(results['opensearch:totalResults'], 10)

  console.log(results)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Определяем данные для отображения на текущей странице
  const currentEntries: IEntry[] = results.entry.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const columns = [
    {
      title: 'Title',
      dataIndex: 'dc:title',
      key: 'dc:title'
    },
    {
      title: 'Creator',
      dataIndex: 'dc:creator',
      key: 'dc:creator'
    },
    {
      title: 'Publication Name',
      dataIndex: 'prism:publicationName',
      key: 'prism:publicationName'
    },
    {
      title: 'DOI',
      dataIndex: 'prism:doi',
      key: 'prism:doi'
    },
    {
      title: 'Open Access',
      dataIndex: 'openaccess',
      key: 'openaccess',
      render: (text: boolean) => (text ? 'Yes' : 'No')
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
        pageSize={itemsPerPage}
        total={totalItems}
        onChange={handlePageChange}
      />
      <Table
        className={styles['table']}
        dataSource={currentEntries}
        columns={columns}
        pagination={false}
        rowKey='dc:identifier' // Используйте уникальный идентификатор для строк
        scroll={{ y: 500 }}
      />
    </>
  )
}

export default SearchResultsTable
