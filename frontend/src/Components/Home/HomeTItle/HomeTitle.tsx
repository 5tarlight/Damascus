import { FC, memo } from 'react'
import styles from './HomeTitle.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const HomeTitle: FC<{}> = () => {
  return (
    <div>
      <h1 className={cx('title')}>We Show Artists</h1>
    </div>
  )
}

export default memo(HomeTitle)
