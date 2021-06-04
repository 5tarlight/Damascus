import { FC } from 'react'
import styles from './DropdownItem.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  closeOnClick(): void
  redirect(s: string): void
  value: string
  to: string
}

const DropdownItem: FC<Props> = ({ closeOnClick, redirect, value, to }) => {
   return (
     <div
       className={cx('profile-link')}
       onClick={e => {
         e.preventDefault()
         e.stopPropagation()
         closeOnClick()
         redirect(to)
       }}
     >{value}</div>
  );
}

export default DropdownItem
