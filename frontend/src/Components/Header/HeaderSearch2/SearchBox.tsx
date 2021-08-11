import { FC, useState } from 'react'
import styles from './SearchBox.scss'
import classNames from 'classnames/bind'
import icon from './searchIcon.png'
import SearchInput from './SearchInput'
import { useHistory } from 'react-router'

const cx = classNames.bind(styles)

interface Props {
  text: string
}

const SearchBox: FC<Props> = ({ text }) => {
  const [search, setSearch] = useState('')
  const history = useHistory()

  const handleSubmit = () => {
    if (search.trim()) history.push(`/search/${search}`)
  }

  return (
    <div className={cx('search-box')}>
      <img
        className={cx('search-icon')}
        src={icon}
        alt="Search"
        onClick={handleSubmit}
      />
      <SearchInput
        value={search}
        setValue={setSearch}
        handleSubmit={handleSubmit}
        placeholder={text}
      />
    </div>
  )
}

export default SearchBox
