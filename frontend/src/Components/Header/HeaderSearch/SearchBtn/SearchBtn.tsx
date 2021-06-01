import { FC } from 'react'
import styles from './SearchBtn.scss'
import classNames from 'classnames/bind'
import { Button, InputGroup } from 'react-bootstrap'

const cx = classNames.bind(styles)

const SearchBtn: FC<{}> = () => {
  return (
    <InputGroup.Append>
        <Button
          className={cx('search-btn')}
          variant="outline-secondary"
        >검색</Button>
      </InputGroup.Append>
  )
}

export default SearchBtn
