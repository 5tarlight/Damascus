import { FC } from 'react'
import styles from './SearchInput.scss'
import classNames from 'classnames/bind'
import { FormControl } from 'react-bootstrap'

const cx = classNames.bind(styles)

const SearchInput: FC<{}> = () => {
  return (
    <FormControl
        className={cx('search-input')}
        placeholder="카테고리"
        aria-label="Category"
        aria-describedby="basic-addon2"
      />
  )
}

export default SearchInput
