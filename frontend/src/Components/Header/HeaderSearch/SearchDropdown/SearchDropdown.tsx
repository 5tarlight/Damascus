import { FC, RefObject } from 'react'
import styles from './SearchDropdown.scss'
import classNames from 'classnames/bind'
import DropdownItem from './DropdownItem/DropdownItem'

const cx = classNames.bind(styles)

export interface DropdownData {
  to: string
  value: string
}

interface Props {
  dropdownRef: RefObject<HTMLDivElement>
  items: [DropdownData?]
  setValue(s: string): void
  handleHide(): void
}

const SearchDropdown: FC<Props> = ({ dropdownRef, items, setValue, handleHide }) => {
  let dd
  if (items.length < 1)
    dd = (<></>)
  else {

    dd = (items as [DropdownData]).map(({ to, value }: DropdownData) => {
      return (
        <DropdownItem
          to={to}
          value={value}
          closeOnClick={handleHide}
          redirect={setValue}
          key={value}
        />
      )
    })
  }

  return (
    <div ref={dropdownRef} className={cx('dropdown-content')}>
      {dd}
    </div>
  )
}

export default SearchDropdown
