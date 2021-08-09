import { Dispatch, FC, SetStateAction } from 'react'
import styles from './SearchInput.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  handleSubmit(): void
}

const SearchInput: FC<Props> = ({ value, setValue, handleSubmit }) => {
  return (
    <input
      className={cx('search-input')}
      placeholder="Search"
      value={value}
      onChange={event => {
        setValue(event.target.value)
      }}
      onKeyDown={e => {
        const { key } = e
        if (key === 'Enter') handleSubmit()
      }}
    />
  )
}

export default SearchInput
