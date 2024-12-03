import axios from 'axios'
import { API_KEY, BASE_URL, PAGE_SIZE } from '@/constants/config'
import { ISearchResult } from '@/types/search-results'

export const fetchScienceDirectData = async (
  query: string,
  offset: number = 0,
  pageSize: number = PAGE_SIZE
): Promise<ISearchResult> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        start: offset,
        count: pageSize,
        query,
        apiKey: API_KEY,
        httpAccept: 'application/json'
      },
      headers: {
        Accept: 'application/json'
      }
    })

    return response.data
  } catch (error: any) {
    throw new Error(error.response ? error.response.data : error.message)
  }
}
