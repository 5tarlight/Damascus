import { FC, useState } from 'react'
import styles from './SearchInput.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {}

const SearchInput: FC<Props> = () => {
  const [value, setValue] = useState('')

  return (
    <input
      className={cx('search-input')}
      placeholder="Search"
      value={value}
      onChange={event => {
        setValue(event.target.value)
      }}
    />
  )
}

export default SearchInput
