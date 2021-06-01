import { FC } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { Button, InputGroup } from 'react-bootstrap'
import SearchInput from './SearchInput/SearchInput'

const cx = classNames.bind(styles)

const HeaderSearch: FC<{}> = () => {
  return (
    <InputGroup className={cx('mb-3', 'search')}>
      <SearchInput />
      <InputGroup.Append>
        <Button
          className={cx('search-btn')}
          variant="outline-secondary"
        >검색</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default HeaderSearch
