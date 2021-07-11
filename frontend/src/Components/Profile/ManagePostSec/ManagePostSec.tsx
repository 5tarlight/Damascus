import { FC } from 'react'
import styles from './ManagePostSec.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {}

const ManagePostSec: FC<Props> = () => {
  return <div className={cx('manage-post')}>게시글 관리</div>
}

export default ManagePostSec
