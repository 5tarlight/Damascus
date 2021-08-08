import { FC } from 'react'
import styles from './SearchBox.scss'
import classNames from 'classnames/bind'
import icon from './searchIcon.png'
import SearchInput from './SearchInput'

const cx = classNames.bind(styles)

interface Props {}

const SearchBox: FC<Props> = () => {
  return (
    <div className={cx('search-box')}>
      <img
        className={cx('search-icon')}
        src={icon}
        onClick={event => {
          // Search
        }}
      />
      <SearchInput />
    </div>
  )
}

export default SearchBox
