import { FC } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { InputGroup } from 'react-bootstrap'
import SearchInput from './SearchInput/SearchInput'
import SearchBtn from './SearchBtn/SearchBtn'

const cx = classNames.bind(styles)

const HeaderSearch: FC<{}> = () => {
  return (
    <InputGroup className={cx('mb-3', 'search')}>
      <SearchInput />
      <SearchBtn />
    </InputGroup>
  )
}

export default HeaderSearch
