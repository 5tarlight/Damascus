import { FC, RefObject } from 'react'
import styles from './SearchDropdown.scss'
import classNames from 'classnames/bind'
import DropdownItem from './DropdownItem/DropdownItem'

const cx = classNames.bind(styles)

interface Props {
  dropdownRef: RefObject<HTMLDivElement>
}

const SearchDropdown: FC<Props> = ({ dropdownRef }) => {

  return (
    <div ref={dropdownRef} className={cx('dropdown-content')}>
      <DropdownItem
        to='/test'
        value='테스트'
        closeOnClick={() => dropdownRef.current?.classList.toggle('show')}
        redirect={s => {

        }}
      />
      <DropdownItem
        to='/test'
        value='테스트'
        closeOnClick={() => dropdownRef.current?.classList.toggle('show')}
        redirect={s => {

        }}
      />
    </div>
  )
}

export default SearchDropdown
