import { FC, RefObject } from 'react'
import styles from './SearchDropdown.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  dropdownRef: RefObject<HTMLDivElement>
}

const SearchDropdown: FC<Props> = ({ dropdownRef }) => {

  return (
    <div ref={dropdownRef} className={cx('dropdown-content')}>
      HehE
    </div>
  )
}

export default SearchDropdown
