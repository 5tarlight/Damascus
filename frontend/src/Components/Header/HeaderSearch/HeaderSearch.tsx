import { FC } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

const cx = classNames.bind(styles)

const HeaderSearch: FC<{}> = () => {
  return (
    <InputGroup className={cx('mb-3', 'search')}>
      <FormControl
        className={cx('search-input')}
        placeholder="카테고리"
        aria-label="Category"
        aria-describedby="basic-addon2"
      />
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
