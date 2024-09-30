export interface ILinkEntry {
  '@_fa': string
  '@ref': string
  '@href': string
}

export interface IAuthor {
  $: string
}

export interface IAuthors {
  author: IAuthor[]
}

export interface IEntry {
  '@_fa': string
  'load-date': string
  link: ILinkEntry[]
  'dc:identifier': string
  'prism:url': string
  'dc:title': string
  'dc:creator': string
  'prism:publicationName': string
  'prism:volume'?: string
  'prism:coverDate': string
  'prism:startingPage'?: string
  'prism:doi': string
  openaccess: boolean
  pii: string
  authors: IAuthors
  'prism:endingPage'?: string
}

export interface ISearchLink {
  '@_fa': string
  '@ref': string
  '@href': string
  '@type': string
}

export interface IOpensearchQuery {
  '@role': string
  '@searchTerms': string
  '@startPage': string
}

export interface ISearchResults {
  'opensearch:totalResults': string
  'opensearch:startIndex': string
  'opensearch:itemsPerPage': string
  'opensearch:Query': IOpensearchQuery
  link: ISearchLink[]
  entry: IEntry[]
}
