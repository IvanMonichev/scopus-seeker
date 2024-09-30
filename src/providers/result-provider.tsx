import { createContext, FC, PropsWithChildren, useState } from 'react'
import { ISearchResult } from '@/types/search-results'
import { IContext } from '@/types/context'

export const ResultContext = createContext<IContext<ISearchResult | undefined> | undefined>(undefined)
export const ResultProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<ISearchResult | undefined>(undefined)
  return <ResultContext.Provider value={{ data, setData }}>{children}</ResultContext.Provider>
}
