import axios from 'axios'
import { API_KEY, BASE_URL } from '@/constants/config'
import { ISearchResult } from '@/types/search-results'

export const fetchScienceDirectData = async (
  query: string,
  start: number = 0,
  count: number = 10
): Promise<ISearchResult> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        start,
        count,
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
