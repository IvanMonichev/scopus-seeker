import { IContext } from '@/types/context'
import { ISearchResult } from '@/types/search-results'
import { useContext } from 'react'
import { ResultContext } from '@/providers/result-provider'

export const useData = (): IContext<ISearchResult | undefined> => {
  const context = useContext(ResultContext)

  if (context === undefined) {
    throw new Error('useData must be used within a DateProvider')
  }
  return context
}
