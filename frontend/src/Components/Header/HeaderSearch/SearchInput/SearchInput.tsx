import { ChangeEvent, FC, KeyboardEvent, memo } from 'react'
import styles from './SearchInput.scss'
import classNames from 'classnames/bind'
import { FormControl } from 'react-bootstrap'

const cx = classNames.bind(styles)

interface Props {
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleShow(): void
  handleClick(text: string): void
  text: string
}

const SearchInput: FC<Props> = ({
  handleChange,
  handleShow,
  handleClick,
  text,
}) => {
  return (
    <FormControl
      className={cx('search-input')}
      placeholder="카테고리"
      aria-label="Category"
      aria-describedby="basic-addon2"
      onChange={handleChange}
      value={text}
      onFocus={handleShow}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleClick(text)
      }}
    />
  )
}

export default memo(SearchInput)
