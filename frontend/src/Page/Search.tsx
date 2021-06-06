import { FC } from 'react'
import { useParams } from 'react-router'

interface SearchParam {
  search: string
}

const Search: FC<{}> = () => {
  const { search } = useParams<SearchParam>()

  return <h1>{search}</h1>
}

export default Search
