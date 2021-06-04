
import { FC, MouseEvent as RMouseEvent, RefObject } from 'react'
import styles from './DropdownBackground.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

type Props = {
  onHide(e: RMouseEvent<HTMLDivElement>): any
  backRef: RefObject<HTMLDivElement>
}

const DropdownBackground: FC<Props> = ({ onHide, backRef }) => {
  return (
    <div className={cx('dropdown-background')} ref={backRef} onClick={onHide} />
  )
}

export default DropdownBackground
