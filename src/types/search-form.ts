import type { Dayjs } from 'dayjs'

export interface ISearchForm {
  query: string
  dateRange: Dayjs[]
}
