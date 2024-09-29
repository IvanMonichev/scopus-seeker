import axios from 'axios'
import { API_KEY, BASE_URL } from '@/constants/config'
import { IResponseDirectData } from '@/types/response-direct-data'

export const fetchScienceDirectData = async (
  query: string,
  start: number = 0,
  count: number = 100
): Promise<IResponseDirectData> => {
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
