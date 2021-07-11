import { FC } from 'react'
import styles from './SettingSec.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {}

const SettingSec: FC<Props> = () => {
  return <div className={cx('setting')}>설정</div>
}

export default SettingSec
