import { FC, MouseEvent as RMouseEvent, RefObject } from 'react'
import styles from './DropdownBackground.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  onHide(e: RMouseEvent<HTMLDivElement>): any
  backRef: RefObject<HTMLDivElement>
  forSearch: boolean
}

const DropdownBackground: FC<Props> = ({
  onHide,
  backRef,
  forSearch = true,
}) => {
  return (
    <div
      className={cx('dropdown-background', { 'for-search': forSearch })}
      ref={backRef}
      onClick={onHide}
    />
  )
}

export default DropdownBackground
